import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

interface Track {
  title: string;
  src: string;
  image: string;
}

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.scss'
})
export class MusicPlayerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('audioPlayer') private readonly audioPlayer?: ElementRef<HTMLAudioElement>;

  readonly storageKey = 'musicSidebarCollapsed';
  readonly emptyImage = '/assets/images/ajolotemusic.png';

  tracks: Track[] = [
    {
      title: 'Aventure - A Beautiful Garden (freetouse.com)',
      src: '/assets/music/Aventure%20-%20A%20Beautiful%20Garden%20(freetouse.com).mp3',
      image: '/assets/images/Aventure%20-%20A%20Beautiful%20Garden%20(freetouse.com).jpg'
    },
    {
      title: 'Inspiring Cinematic Music - Tunetank',
      src: '/assets/music/Inspiring%20Cinematic%20Music%20-%20Tunetank.mp3',
      image: '/assets/images/Inspiring%20Cinematic%20Music%20-%20Tunetank.jpg'
    }
  ];

  currentIndex = 0;
  filterText = '';
  isCollapsed = false;
  isMuted = false;
  isPlaying = false;
  currentTimeLabel = '0:00';
  totalTimeLabel = '0:00';
  progressValue = 0;
  volumeValue = 0.8;
  private localObjectUrls: string[] = [];

  get currentTrack(): Track | undefined {
    return this.tracks[this.currentIndex];
  }

  get filteredTracks(): Array<{ track: Track; index: number }> {
    const normalized = this.filterText.trim().toLowerCase();
    return this.tracks
      .map((track, index) => ({ track, index }))
      .filter(({ track }) => track.title.toLowerCase().includes(normalized));
  }

  trackByIndex(_index: number, item: { track: Track; index: number }): number {
    return item.index;
  }

  ngAfterViewInit(): void {
    this.isCollapsed = localStorage.getItem(this.storageKey) === 'true';
    this.applyVolume(this.volumeValue);
    this.loadTrack(this.currentIndex, false);
  }

  ngOnDestroy(): void {
    this.localObjectUrls.forEach((url) => URL.revokeObjectURL(url));
    this.localObjectUrls = [];
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    localStorage.setItem(this.storageKey, this.isCollapsed.toString());
  }

  togglePlay(): void {
    const player = this.audioPlayer?.nativeElement;
    if (!player) return;
    player.paused ? player.play().catch(() => {}) : player.pause();
  }

  prevTrack(): void {
    this.loadTrack(this.currentIndex - 1, true);
  }

  nextTrack(): void {
    this.loadTrack(this.currentIndex + 1, true);
  }

  toggleMute(): void {
    const player = this.audioPlayer?.nativeElement;
    if (!player) return;
    player.muted = !player.muted;
    this.isMuted = player.muted;
  }

  onSearch(value: string): void {
    this.filterText = value;
  }

  onPickLocal(files: FileList | null): void {
    if (!files || files.length === 0) return;
    this.localObjectUrls.forEach((url) => URL.revokeObjectURL(url));
    this.localObjectUrls = [];

    const localTracks: Track[] = Array.from(files)
      .filter((file) => file.type.startsWith('audio/'))
      .map((file) => {
        const url = URL.createObjectURL(file);
        this.localObjectUrls.push(url);
        const name = file.name.replace(/\.[^/.]+$/, '');
        return {
          title: name,
          src: url,
          image: this.emptyImage
        };
      });

    if (localTracks.length === 0) return;
    const startIndex = this.tracks.length;
    this.tracks.push(...localTracks);
    this.currentIndex = startIndex;
    this.filterText = '';
    this.loadTrack(startIndex, true);
  }

  selectTrack(index: number): void {
    if (index === this.currentIndex) {
      this.togglePlay();
      return;
    }
    this.loadTrack(index, true);
  }

  deleteTrack(index: number, event?: Event): void {
    event?.stopPropagation();
    const removed = this.tracks.splice(index, 1)[0];
    if (removed?.src.startsWith('blob:')) {
      URL.revokeObjectURL(removed.src);
      this.localObjectUrls = this.localObjectUrls.filter((url) => url !== removed.src);
    }

    if (this.tracks.length === 0) {
      this.currentIndex = 0;
      const player = this.audioPlayer?.nativeElement;
      if (player) {
        player.pause();
        player.removeAttribute('src');
        player.load();
      }
      this.updateNowPlaying();
      return;
    }

    if (index < this.currentIndex) {
      this.currentIndex -= 1;
    } else if (index === this.currentIndex) {
      const nextIndex = Math.min(this.currentIndex, this.tracks.length - 1);
      const shouldPlay = !this.audioPlayer?.nativeElement.paused;
      this.loadTrack(nextIndex, shouldPlay ?? false);
    }
  }

  onProgressChange(value: string): void {
    const player = this.audioPlayer?.nativeElement;
    if (!player || !Number.isFinite(player.duration) || player.duration === 0) return;
    const ratio = Number(value) / 1000;
    player.currentTime = ratio * player.duration;
  }

  onVolumeChange(value: string): void {
    this.applyVolume(Number(value));
  }

  onLoadedMetadata(): void {
    this.updateProgress();
  }

  onTimeUpdate(): void {
    this.updateProgress();
  }

  onPlay(): void {
    this.isPlaying = true;
  }

  onPause(): void {
    this.isPlaying = false;
  }

  onEnded(): void {
    this.loadTrack(this.currentIndex + 1, true);
  }

  onVolumeUpdate(): void {
    const player = this.audioPlayer?.nativeElement;
    if (!player) return;
    this.isMuted = player.muted;
    if (this.volumeValue !== player.volume) {
      this.volumeValue = player.volume;
    }
  }

  private loadTrack(index: number, autoplay: boolean): void {
    if (this.tracks.length === 0) return;
    this.currentIndex = (index + this.tracks.length) % this.tracks.length;
    const player = this.audioPlayer?.nativeElement;
    if (!player) return;
    player.src = this.tracks[this.currentIndex].src;
    player.load();
    if (autoplay) {
      player.play().catch(() => {});
    }
    this.updateNowPlaying();
  }

  private updateNowPlaying(): void {
    const player = this.audioPlayer?.nativeElement;
    if (!player) return;
    this.isPlaying = !player.paused;
  }

  private updateProgress(): void {
    const player = this.audioPlayer?.nativeElement;
    if (!player || !Number.isFinite(player.duration) || player.duration === 0) {
      this.progressValue = 0;
      this.currentTimeLabel = '0:00';
      this.totalTimeLabel = '0:00';
      return;
    }

    const ratio = player.currentTime / player.duration;
    this.progressValue = Math.round(ratio * 1000);
    this.currentTimeLabel = this.formatTime(player.currentTime);
    this.totalTimeLabel = this.formatTime(player.duration);
  }

  private formatTime(value: number): string {
    if (!Number.isFinite(value) || value < 0) return '0:00';
    const minutes = Math.floor(value / 60);
    const seconds = Math.floor(value % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  }

  private applyVolume(value: number): void {
    const player = this.audioPlayer?.nativeElement;
    if (!player) return;
    this.volumeValue = value;
    player.volume = value;
    if (value > 0 && player.muted) {
      player.muted = false;
    }
    this.isMuted = player.muted;
  }
}
