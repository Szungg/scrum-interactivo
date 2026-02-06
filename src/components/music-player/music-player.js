// ========== SIDEBAR DE MUSICA ==========
function setupMusicSidebar() {
    const sidebar = document.querySelector('.music-sidebar');
    const player = document.getElementById('music-player');
    const list = document.getElementById('music-list');
    const search = document.getElementById('music-search');
    const art = document.getElementById('music-art');
    const nowLabel = document.getElementById('music-now');
    const playButton = document.getElementById('music-play');
    const prevButton = document.getElementById('music-prev');
    const nextButton = document.getElementById('music-next');
    const muteButton = document.getElementById('music-mute');
    const progress = document.getElementById('music-progress');
    const timeCurrent = document.getElementById('music-time-current');
    const timeTotal = document.getElementById('music-time-total');
    const volume = document.getElementById('music-volume');
    const toggleButton = document.getElementById('music-toggle');
    const localButton = document.getElementById('music-local');
    const localInput = document.getElementById('music-files');
    if (!sidebar || !player || !list || !search || !art || !nowLabel || !playButton || !prevButton || !nextButton || !muteButton || !progress || !timeCurrent || !timeTotal || !volume || !toggleButton || !localButton || !localInput) return;

    const STORAGE_KEY = 'musicSidebarCollapsed';
    // BEGIN AUTO-GENERATED MUSIC TRACKS
    const tracks = [
            {
            title: 'Aventure - A Beautiful Garden (freetouse.com)',
            src: 'src/public/music/Aventure%20-%20A%20Beautiful%20Garden%20(freetouse.com).mp3',
            image: 'src/public/images/Aventure%20-%20A%20Beautiful%20Garden%20(freetouse.com).jpg'
        },
        {
            title: 'Eminem-Mockingbird',
            src: 'src/public/music/Eminem-Mockingbird.mp3',
            image: 'src/public/images/ajolotemusic.png'
        },
        {
            title: 'Inspiring Cinematic Music - Tunetank',
            src: 'src/public/music/Inspiring%20Cinematic%20Music%20-%20Tunetank.mp3',
            image: 'src/public/images/Inspiring%20Cinematic%20Music%20-%20Tunetank.jpg'
        }
    ]
    // END AUTO-GENERATED MUSIC TRACKS
    const EMPTY_IMAGE = 'src/public/images/ajolotemusic.png';

    let currentIndex = 0;
    let localObjectUrls = [];

    const formatTime = (value) => {
        if (!Number.isFinite(value) || value < 0) return '0:00';
        const minutes = Math.floor(value / 60);
        const seconds = Math.floor(value % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds}`;
    };

    const updateNowPlaying = () => {
        const track = tracks[currentIndex];
        nowLabel.textContent = track ? track.title : 'Sin reproduccion';
        if (track && track.image) {
            art.src = track.image;
            art.alt = `Imagen de ${track.title}`;
        } else {
            art.src = EMPTY_IMAGE;
            art.alt = 'Sin imagen';
        }
    };

    const updatePlayButton = () => {
        playButton.textContent = player.paused ? '▶' : 'II';
        playButton.setAttribute('aria-pressed', (!player.paused).toString());
    };

    const updateMuteButton = () => {
        muteButton.textContent = player.muted ? '🔊' : '🔈';
        muteButton.setAttribute('aria-pressed', player.muted.toString());
    };

    const applyCollapsedState = (collapsed) => {
        sidebar.classList.toggle('is-collapsed', collapsed);
        toggleButton.textContent = collapsed ? '◀' : '▶';
        toggleButton.setAttribute('aria-pressed', collapsed.toString());
        toggleButton.setAttribute('aria-label', collapsed ? 'Mostrar sidebar de musica' : 'Ocultar sidebar de musica');
    };

    const setActive = (index) => {
        list.querySelectorAll('.music-sidebar__item').forEach(item => {
            item.classList.toggle('is-active', Number(item.dataset.index) === index);
        });
    };

    const loadTrack = (index, autoplay = false) => {
        if (tracks.length === 0) return;
        currentIndex = (index + tracks.length) % tracks.length;
        const track = tracks[currentIndex];
        player.src = track.src;
        player.load();
        updateNowPlaying();
        setActive(currentIndex);
        if (autoplay) {
            player.play().catch(() => {});
        }
        updatePlayButton();
    };

    const updateProgress = () => {
        if (!Number.isFinite(player.duration) || player.duration === 0) {
            progress.value = '0';
            timeCurrent.textContent = '0:00';
            timeTotal.textContent = '0:00';
            return;
        }
        const ratio = player.currentTime / player.duration;
        progress.value = Math.round(ratio * 1000).toString();
        timeCurrent.textContent = formatTime(player.currentTime);
        timeTotal.textContent = formatTime(player.duration);
    };

    const renderList = (filterText = '') => {
        const normalized = filterText.trim().toLowerCase();
        list.innerHTML = '';

        const filtered = tracks
            .map((track, index) => ({ track, index }))
            .filter(({ track }) => track.title.toLowerCase().includes(normalized));

        filtered.forEach(({ track, index }) => {
            const item = document.createElement('div');
            item.className = 'music-sidebar__item';
            item.dataset.index = index.toString();

            const titleButton = document.createElement('button');
            titleButton.type = 'button';
            titleButton.className = 'music-sidebar__item-button';
            titleButton.textContent = track.title;
            titleButton.addEventListener('click', () => {
                if (index === currentIndex) {
                    player.paused ? player.play() : player.pause();
                    return;
                }
                loadTrack(index, true);
            });

            const deleteButton = document.createElement('button');
            deleteButton.type = 'button';
            deleteButton.className = 'music-sidebar__delete';
            deleteButton.setAttribute('aria-label', `Eliminar ${track.title}`);
            deleteButton.textContent = '×';
            deleteButton.addEventListener('click', (event) => {
                event.stopPropagation();
                const removed = tracks.splice(index, 1)[0];
                if (removed && removed.src && removed.src.startsWith('blob:')) {
                    URL.revokeObjectURL(removed.src);
                    localObjectUrls = localObjectUrls.filter((url) => url !== removed.src);
                }

                if (tracks.length === 0) {
                    currentIndex = 0;
                    player.pause();
                    player.removeAttribute('src');
                    player.load();
                    updateNowPlaying();
                    renderList(search.value);
                    return;
                }

                if (index < currentIndex) {
                    currentIndex -= 1;
                } else if (index === currentIndex) {
                    const nextIndex = Math.min(currentIndex, tracks.length - 1);
                    const shouldPlay = !player.paused;
                    loadTrack(nextIndex, shouldPlay);
                }

                renderList(search.value);
            });

            item.appendChild(titleButton);
            item.appendChild(deleteButton);
            list.appendChild(item);
        });

        if (filtered.length === 0) {
            const empty = document.createElement('div');
            empty.className = 'music-sidebar__item music-sidebar__item--empty';
            empty.textContent = 'Sin resultados';
            empty.setAttribute('aria-live', 'polite');
            empty.style.cursor = 'default';
            list.appendChild(empty);
        }

        setActive(currentIndex);
    };

    search.addEventListener('input', () => {
        renderList(search.value);
    });

    toggleButton.addEventListener('click', () => {
        const nextState = !sidebar.classList.contains('is-collapsed');
        applyCollapsedState(nextState);
        localStorage.setItem(STORAGE_KEY, nextState.toString());
    });

    localButton.addEventListener('click', () => {
        localInput.click();
    });

    localInput.addEventListener('change', () => {
        const files = Array.from(localInput.files || []);
        if (files.length === 0) return;

        localObjectUrls.forEach((url) => URL.revokeObjectURL(url));
        localObjectUrls = [];

        const localTracks = files
            .filter((file) => file.type.startsWith('audio/'))
            .map((file) => {
                const url = URL.createObjectURL(file);
                localObjectUrls.push(url);
                const name = file.name.replace(/\.[^/.]+$/, '');
                return {
                    title: name,
                    src: url,
                    image: EMPTY_IMAGE
                };
            });

        if (localTracks.length === 0) return;
        const startIndex = tracks.length;
        tracks.push(...localTracks);
        currentIndex = startIndex;
        search.value = '';
        renderList();
        loadTrack(startIndex, true);
    });


    playButton.addEventListener('click', () => {
        player.paused ? player.play() : player.pause();
    });

    prevButton.addEventListener('click', () => {
        loadTrack(currentIndex - 1, true);
    });

    nextButton.addEventListener('click', () => {
        loadTrack(currentIndex + 1, true);
    });

    muteButton.addEventListener('click', () => {
        player.muted = !player.muted;
        updateMuteButton();
    });

    progress.addEventListener('input', () => {
        if (!Number.isFinite(player.duration) || player.duration === 0) return;
        const ratio = Number(progress.value) / 1000;
        player.currentTime = ratio * player.duration;
    });

    volume.addEventListener('input', () => {
        player.volume = Number(volume.value);
        if (player.volume > 0 && player.muted) {
            player.muted = false;
        }
        updateMuteButton();
    });

    player.addEventListener('loadedmetadata', updateProgress);
    player.addEventListener('timeupdate', updateProgress);
    player.addEventListener('play', updatePlayButton);
    player.addEventListener('pause', updatePlayButton);
    player.addEventListener('volumechange', () => {
        if (Number(volume.value) !== player.volume) {
            volume.value = player.volume.toString();
        }
        updateMuteButton();
    });
    player.addEventListener('ended', () => {
        loadTrack(currentIndex + 1, true);
    });

    const initialIndex = tracks.findIndex(track => player.src.endsWith(track.src));
    currentIndex = initialIndex >= 0 ? initialIndex : 0;
    player.volume = Number(volume.value);
    updateMuteButton();

    const initialCollapsed = localStorage.getItem(STORAGE_KEY) === 'true';
    applyCollapsedState(initialCollapsed);

    renderList();
    loadTrack(currentIndex, false);
}
