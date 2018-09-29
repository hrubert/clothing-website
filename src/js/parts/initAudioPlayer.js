import { $, isIOs } from './_utility';

/*------------------------------------------------------------------

  Init Audio Player

-------------------------------------------------------------------*/
function initAudioPlayerProgressBar() {
    if (typeof Hammer !== 'undefined') {
        const $progresses = $('.nk-audio-plain:not(.nk-audio-plain-enabled), .nk-audio-player-main:not(.nk-audio-player-main-enabled)')
            .find('.nk-audio-progress');
        $progresses.each(function eachProgresses() {
            const $curProgressCont = $(this);
            const $curProgres = $curProgressCont.children();
            let curApi;
            let progressW;
            let progressCurW;
            let progressStart = false;
            const HammerProgress = new Hammer.Manager($curProgressCont[0]);
            HammerProgress.add(new Hammer.Pan({
                pointers: 1,
                threshold: 0,
            }));
            HammerProgress.add(new Hammer.Press({
                time: 1,
            }));
            HammerProgress.on('pan press pressup', (e) => {
                // start
                if (e.type === 'press' || progressStart === false) {
                    $curProgressCont.data('busy', true);
                    progressW = $curProgressCont.width();
                    progressStart = e.pointers[0].clientX - $curProgressCont[0].getBoundingClientRect().left;
                    $curProgressCont.addClass('hover');
                }

                // each
                progressCurW = Math.min(1, Math.max(0, (progressStart + e.deltaX) / progressW));
                $curProgres[0].style.width = `${progressCurW * 100}%`;

                // end
                if (e.isFinal || e.type === 'pressup') {
                    if (!curApi) {
                        curApi = $curProgressCont.parents('.nk-audio-player-main, .nk-audio-plain')[0].audioAPI;
                    }
                    if (curApi) {
                        curApi.seek(progressCurW);
                    }

                    $curProgressCont.removeClass('hover');
                    $curProgressCont.data('busy', false);
                    progressStart = false;
                }

                e.preventDefault();
            });
        });
    }
}
function initAudioPlayer() {
    if (typeof soundManager === 'undefined') {
        return;
    }

    /* Global Audio Player */
    const _self = this;
    const $player = $('.nk-audio-player-main:not(.nk-audio-player-main-enabled)');
    let api;
    let player;
    const $title = $player.find('.nk-audio-title > div');
    const $timer = $player.find('.nk-audio-time');
    const $playBtn = $player.find('.nk-audio-play-pause .nk-audio-play');
    const $pauseBtn = $player.find('.nk-audio-play-pause .nk-audio-pause');
    const $prevBtn = $player.find('.nk-audio-prev');
    const $nextBtn = $player.find('.nk-audio-next');
    const $progressCont = $player.find('.nk-audio-progress');
    const $progress = $progressCont.find('.nk-audio-progress-current');
    const $volumeBtn = $player.find('.nk-audio-volume-icon');
    const $volumeCont = $player.find('.nk-audio-volume .nk-audio-volume-inner');
    const $volume = $volumeCont.find('.nk-audio-volume-current');
    const $playlist = $player.find('.nk-audio-player-playlist-inner');

    // Volume controller will be automatically removed on iOs devices, because of limitation of volume control
    if (isIOs) {
        $player.find('.nk-audio-volume').remove();
    }

    /**
    * Player class containing the state of our playlist and where we are in it.
    * Includes all methods for playing, skipping, updating the display, etc.
    * @param {Array} options Array of objects with playlist song details ({title, file, howl}).
    */
    function Player(options) {
        const self = this;

        self.options = options;
        self.playlist = options.playlist;
        self.index = options.start || 0;
        self.volume = typeof options.volume !== 'undefined' ? options.volume : 100;
        self.pinned = options.pinned || false;
        self.loop = false;
        self.shuffle = false;
        self.progress = 0;
        self.muted = false;
        self.playing = false;

        // restore player data
        if (localStorage && typeof localStorage.khakiAudioPlayer !== 'undefined') {
            const storedData = JSON.parse(localStorage.khakiAudioPlayer);
            self.playlist = storedData.playlist || self.options.playlist;
            self.index = storedData.index;
            self.volume = storedData.volume;
            self.pinned = storedData.pinned;
            self.loop = storedData.loop;
            self.shuffle = storedData.shuffle;
            self.progress = storedData.progress;
            self.muted = storedData.muted;
            self.playing = storedData.playing;
        }

        // create playlist
        self.createPlaylist(self.playlist);

        // set api
        let firstLoad = true;
        function onPlay() {
            self.playing = true;
            $player.addClass('nk-audio-player-playing');

            // update playlist
            $playlist.find('.nk-playlist-item-playing, .nk-playlist-item-active').removeClass('nk-playlist-item-playing nk-playlist-item-active');
            $playlist.find(`[data-index=${self.index}]`).addClass('nk-playlist-item-playing nk-playlist-item-active');

            // update playlist on the page
            if (self.$pagePlaylist) {
                self.$pagePlaylist.find('[data-index]').removeClass('nk-audio-playlist-item-playing nk-audio-playlist-item-active');
                self.$pagePlaylist.find(`[data-index=${self.index}]`).addClass('nk-audio-playlist-item-playing nk-audio-playlist-item-active');
            }
        }
        function onStop() {
            self.playing = false;
            $player.removeClass('nk-audio-player-playing');

            // update playlist
            $playlist.find('.nk-playlist-item-playing').removeClass('nk-playlist-item-playing');

            // update playlist on the page
            if (self.$pagePlaylist) {
                self.$pagePlaylist.find('[data-index].nk-audio-playlist-item-playing').removeClass('nk-audio-playlist-item-playing');
            }
        }
        api = soundManager.createSound({
            volume: self.volume,
            whileplaying() {
                self.step();
            },
            onplay: onPlay,
            onresume: onPlay,
            onpause: onStop,
            onstop: onStop,
            onload(ok) {
                if (!ok && this._iO && this._iO.onerror) {
                    this._iO.onerror();
                }
            },
            onerror() {

            },
            onfinish() {
                if (self.loop) {
                    self.play();
                } else {
                    self.skip('right');
                }
            },
            onbufferchange() {
                if (firstLoad && api.duration) {
                    firstLoad = false;
                    // seek
                    self.seek(self.progress);
                }
            },
        });

        // autoplay
        if (self.playlist && self.playlist.list && self.playlist.list.length) {
            if (self.options.autoplay || self.playing) {
                self.play();
            } else {
                self.play();
                self.pause();
            }
        }

        // mute
        self.updateVolumeBar();

        // pin
        $player.css('transition', 'none');
        self.pin(self.pinned, true);
        setTimeout(() => {
            $player.css('transition', '');
        }, 1);

        // loop
        self.setLoop(self.loop);

        // shuffle
        self.setShuffle(self.shuffle);

        // save player data
        function saveData() {
            if (localStorage) {
                localStorage.khakiAudioPlayer = JSON.stringify({
                    playlist: self.playlist,
                    index: self.index,
                    volume: self.volume,
                    pinned: self.pinned,
                    loop: self.loop,
                    shuffle: self.shuffle,
                    progress: self.progress,
                    muted: self.muted,
                    playing: self.playing,
                });
            }
        }
        if (localStorage) {
            // save on close window and every 20 seconds
            $(window).on('unload', saveData);
            setInterval(saveData, 20000);
        }

        // Events to control player
        // play, pause, next, prev
        $playBtn.on('click', () => {
            self.play();
        });
        $pauseBtn.on('click', () => {
            self.pause();
        });
        $prevBtn.on('click', () => {
            self.skip('prev');
        });
        $nextBtn.on('click', () => {
            self.skip('next');
        });

        // volume
        $volumeBtn.on('click', () => {
            self.mute();
        });
        if (typeof Hammer !== 'undefined') {
            let volumeW;
            let volumeCurW;
            let volumeStart = false;
            const HammerVol = new Hammer.Manager($volumeCont[0]);
            HammerVol.add(new Hammer.Pan({
                pointers: 1,
                threshold: 0,
            }));
            HammerVol.add(new Hammer.Press({
                time: 1,
            }));
            HammerVol.on('pan press pressup', (e) => {
                // start
                if (e.type === 'press' || volumeStart === false) {
                    volumeW = $volumeCont.width();
                    volumeStart = e.pointers[0].clientX - $volumeCont[0].getBoundingClientRect().left;
                    $volumeCont.addClass('hover');
                }

                // each
                volumeCurW = Math.min(1, Math.max(0, (volumeStart + e.deltaX) / volumeW)) * 100;
                self.setVolume(volumeCurW);

                // end
                if (e.isFinal || e.type === 'pressup') {
                    $volumeCont.removeClass('hover');
                    volumeStart = false;
                }

                e.preventDefault();
            });
        }

        // playlist
        $playlist.on('click', '> [data-index]', function eachPlylists() {
            const idx = parseInt($(this).attr('data-index'), 10);
            if (self.index === idx) {
                if (self.playing) {
                    self.pause();
                } else {
                    self.play();
                }
            } else {
                self.skipTo(idx);
            }
        });
        $playlist.on('click', '.nk-playlist-right a', (e) => {
            e.stopPropagation();
        });

        // pin player
        $('.nk-audio-pin').on('click', (e) => {
            self.pin();
            e.preventDefault();
        });

        // loop
        $player.on('click', '.nk-audio-settings .nk-audio-loop', () => {
            self.setLoop();
        });

        // shuffle
        $player.on('click', '.nk-audio-settings .nk-audio-shuffle', () => {
            self.setShuffle();
        });

        // show playlist
        $player.on('click', '.nk-audio-settings .nk-audio-playlist', () => {
            self.showPlaylist();
        });
    }
    Player.prototype = {
        /**
         * Create playlist and show player
         */
        createPlaylist(playlist, skipTo) {
            if (!playlist || !playlist.list || !playlist.list.length) {
                return;
            }
            const self = this;
            let oldPlaylist = $.extend(true, {}, self.playlist);

            self.playlist = $.extend(true, {}, playlist);
            self.playlistShuffle = [];

            // Setup the playlist display.
            let playlistInner = '';
            const playListBtn = `
                <div class="nk-playlist-play-pause">
                    <span class="nk-playlist-play"><span class="ion-play ml-3"></span></span>
                    <span class="nk-playlist-pause"><span class="ion-pause"></span></span>
                </div>`;
            let song;
            for (let k = 0; k < self.playlist.list.length; k++) {
                song = self.playlist.list[k];
                self.playlistShuffle.push(k);
                playlistInner += `
                    <li data-index="${k}">
                        <div class="container nk-playlist-item-cont">
                            <div>${playListBtn}</div>
                            <div class="nk-playlist-title"><div>${song.title}</div></div>
                            <div class="nk-playlist-right">
                                ${song.buttons || ''}
                                ${song.duration ? ` <span class="nk-playlist-item-duration">${song.duration}</span>` : ''}
                            </div>
                        </div>
                    </li>`;
            }
            $playlist.html(playlistInner);

            // http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
            function shuffleArr(a, b, c, d) {
                c = a.length; while (c) {
                    b = Math.random() * (--c + 1) || 0;
                    d = a[c];
                    a[c] = a[b];
                    a[b] = d;
                }
            }
            shuffleArr(self.playlistShuffle);

            // add page playlist dom item
            // $(this).data('nk-playlist-data', result);
            if (self.playlist.id) {
                const $newPagePlaylist = $(`#${self.playlist.id}`);
                if (JSON.stringify($newPagePlaylist.data('nk-playlist-data')) === JSON.stringify(self.playlist)) {
                    self.$pagePlaylist = $newPagePlaylist;
                } else {
                    self.$pagePlaylist = null;
                }
            } else {
                self.$pagePlaylist = null;
            }

            // prevent if new playlist the same as current
            if (JSON.stringify(oldPlaylist) === JSON.stringify(self.playlist)) {
                if (skipTo === self.index) {
                    if (self.playing) {
                        self.pause();
                    } else {
                        self.play();
                    }
                } else if (typeof skipTo !== 'undefined') {
                    self.skipTo(skipTo);
                }
            } else {
                // remove active items from old playlist
                // update playlist on the page
                if (oldPlaylist.id) {
                    $(`#${oldPlaylist.id}`).find('[data-index]').removeClass('nk-audio-playlist-item-playing nk-audio-playlist-item-active');
                }
                if (typeof skipTo !== 'undefined') {
                    self.skipTo(skipTo);
                }
            }
            oldPlaylist = null;

            // show player
            $player.addClass('show');

            _self.initPluginNano();
        },

        /**
        * Play a song in the playlist.
        * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
        */
        play(index) {
            const self = this;

            index = typeof index === 'number' ? index : self.index;
            if (!self.playlist.list[index]) {
                index = 0;
            }
            const data = self.playlist.list[index];

            self.index = index;

            // pause all players
            soundManager.pauseAll();

            // Begin playing the sound.
            api.play({
                url: data.src,
            });

            // Update the track display.
            $title.html(data.title);
        },

        /**
        * Pause the currently playing track.
        */
        pause() {
            // Puase the sound.
            soundManager.pauseAll();
        },

        /**
        * Skip to the next or previous track.
        * @param  {String} direction 'next' or 'prev'.
        */
        skip(direction) {
            const self = this;
            let index = 0;

            // shuffle
            if (self.shuffle) {
                let key = self.playlistShuffle.indexOf(self.index);
                key = parseInt(key, 10);

                // Get the next track based on the direction of the track.
                if (direction === 'prev') {
                    index = key - 1;
                    if (index < 0) {
                        index = self.playlistShuffle.length - 1;
                    }
                } else {
                    index = key + 1;
                    if (index >= self.playlistShuffle.length) {
                        index = 0;
                    }
                }
                index = self.playlistShuffle[index];

            // Get the next track based on the direction of the track.
            } else if (direction === 'prev') {
                index = self.index - 1;
                if (index < 0) {
                    index = self.playlist.list.length - 1;
                }
            } else {
                index = self.index + 1;
                if (index >= self.playlist.list.length) {
                    index = 0;
                }
            }

            self.skipTo(index);
        },

        /**
        * Skip to a specific track based on its playlist index.
        * @param  {Number} index Index in the playlist.
        */
        skipTo(index) {
            const self = this;

            // Stop the current track.
            api.stop();

            // Reset progress.
            if (!$progressCont.data('busy')) {
                $progress[0].style.width = '0%';
            }
            self.progress = 0;

            // Play the new track.
            self.play(index);
        },

        /**
        * Set the volume and update the volume slider display.
        * @param  {Number} val Volume between 0 and 1.
        */
        setVolume(val, noTouchMute) {
            const self = this;

            val = Math.min(100, Math.max(0, val));

            // Update the volume to the new value.
            api.setVolume(val);

            // unmute
            if (!api.muted && !noTouchMute) {
                self.mute(false);
            }

            self.volume = val;
            self.updateVolumeBar();
        },

        /**
        * Mute / Unmute sound
        */
        mute(val) {
            const self = this;

            // Update the volume to the new value.
            self.muted = typeof val !== 'undefined' ? val : !api.muted;
            if (self.muted) {
                api.mute();
            } else {
                api.unmute();
            }

            self.updateVolumeBar();
        },

        /**
        * Update volume bar icons
        */
        updateVolumeBar() {
            const self = this;

            // Volume controller will be automatically removed on iOs devices, because of limitation of volume control
            if (isIOs) {
                return;
            }

            $player.removeClass('volume-muted volume-half volume-small');

            // Update the display on the slider.
            $volume[0].style.width = `${self.volume}%`;

            if (self.muted || self.volume === 0) {
                $player.addClass('volume-muted');

            // change icons
            } else if (self.volume < 20) {
                $player.addClass('volume-small');
            } else if (self.volume < 70) {
                $player.addClass('volume-half');
            }
        },

        /**
        * Seek to a new position in the currently playing track.
        * @param  {Number} per Percentage through the song to skip.
        */
        seek(per) {
            api.setPosition(api.duration * per);
        },

        /**
        * The step called within requestAnimationFrame to update the playback position.
        */
        step() {
            const self = this;
            // Determine our current seek position.
            const seek = api.position || 0;
            self.progress = seek / api.duration;
            $timer[0].innerHTML = self.formatTime(Math.round(seek));

            if (!$progressCont.data('busy')) {
                $progress[0].style.width = `${self.progress * 100 || 0}%`;
            }
        },

        /**
        * Format the time from seconds to M:SS.
        * @param  {Number} secs Seconds to format.
        * @return {String}      Formatted time.
        */
        formatTime(msec) {
            const secs = Math.round(msec / 1000) || 0;
            let minutes = Math.floor(secs / 60) || 0;
            minutes = (minutes < 10 ? '0' : 0) + minutes;
            const seconds = secs - minutes * 60;
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        },

        /**
        * Loop track
        * @param  {Number} true or false. If nothing - toggle loop
        */
        setLoop(val) {
            const self = this;

            if (typeof val !== 'undefined') {
                $player[`${val ? 'add' : 'remove'}Class`]('nk-audio-player-loop');
            } else {
                $player.toggleClass('nk-audio-player-loop');
            }
            self.loop = $player.hasClass('nk-audio-player-loop');
        },

        /**
        * Shuffle playlist
        * @param  {Number} true or false. If nothing - toggle shuffle
        */
        setShuffle(val) {
            const self = this;

            if (typeof val !== 'undefined') {
                $player[`${val ? 'add' : 'remove'}Class`]('nk-audio-player-shuffle');
            } else {
                $player.toggleClass('nk-audio-player-shuffle');
            }
            self.shuffle = $player.hasClass('nk-audio-player-shuffle');
        },

        /**
        * Pin player
        * @param  {Number} true or false. If nothing - toggle pin
        */
        pin(val) {
            const self = this;

            if (typeof val !== 'undefined') {
                $player[`${val ? 'add' : 'remove'}Class`]('nk-audio-player-pin');
            } else {
                $player.toggleClass('nk-audio-player-pin');
            }
            self.pinned = $player.hasClass('nk-audio-player-pin');
        },

        /**
        * Show / Hide playlist
        * @param  {Number} true or false. If nothing - toggle pin
        */
        showPlaylist(val) {
            const self = this;

            if (typeof val !== 'undefined') {
                $player[`${val ? 'add' : 'remove'}Class`]('nk-audio-player-playlist-opened');
            } else {
                $player.toggleClass('nk-audio-player-playlist-opened');
            }
            self.pinned = $player.hasClass('nk-audio-player-playlist-opened');
        },
    };

    // Setup all playlists on the page
    const playlist = [];
    $('ul.nk-audio-playlist:not(.nk-audio-playlist-enabled)').addClass('nk-audio-playlist-enabled').each(function eachAudioPlaylists() {
        const ID = $(this).attr('id') || false;
        const isHidden = $(this).hasClass('nk-audio-playlist-hidden');
        const isActive = $(this).hasClass('active');
        const list = [];
        $(this).find('> li').each(function eachPlylistItems() {
            const src = $(this).attr('data-src');
            if (!src) {
                return;
            }

            // add index attribute
            $(this).attr('data-index', list.length);

            // add to list
            list.push({
                title: $(this).find('.nk-audio-playlist-title').html() || '',
                src,
                duration: $(this).find('.nk-audio-playlist-duration').text() || '',
                buttons: $(this).find('.nk-audio-playlist-buttons').html() || '',
            });

            // add play and pause buttons
            if (!isHidden) {
                $(this).prepend(_self.options.templates.audioPlaylistButton);
            }
        });
        if (list.length) {
            const result = {
                id: ID,
                isHidden,
                isActive,
                list,
            };
            playlist.push(result);

            // add playlist data to the dom element
            $(this).data('nk-playlist-data', result);

            // add playlist to player
            $(this).on('click', 'li[data-index]', function onClickPlylistItem() {
                player.createPlaylist(result, parseInt($(this).attr('data-index'), 10));
            });
        }
    });

    /* Plain audio players */
    const $playersPlain = $('.nk-audio-plain:not(.nk-audio-plain-enabled)');

    // add play and pause buttons
    $playersPlain.prepend(_self.options.templates.audioPlainButton);

    function PlayersPlain($item) {
        const self = this;
        self.$item = $item;
        self.url = $item.attr('data-src');
        self.$playPauseBtn = $item.find('.nk-audio-plain-play-pause');
        self.$progress = $item.find('.nk-audio-progress-current');

        self.$timer = $item.find('.nk-audio-plain-duration');
        self.$timer.attr('data-duration', self.$timer.text());

        function onPlay() {
            $item.addClass('nk-audio-plain-playing');
        }
        function onStop() {
            self.seek(0);
            self.step();
            self.$item.removeClass('nk-audio-plain-playing');
            self.$timer.text(self.$timer.attr('data-duration'));
        }
        self.api = soundManager.createSound({
            volume: 100,
            whileplaying() {
                self.step();
            },
            onplay: onPlay,
            onresume: onPlay,
            onpause() {
                self.$item.removeClass('nk-audio-plain-playing');
                self.$timer.text(self.$timer.attr('data-duration'));
            },
            onstop: onStop,
            onfinish: onStop,
            onload(ok) {
                if (!ok && this._iO && this._iO.onerror) {
                    this._iO.onerror();
                }
            },
        });

        self.$playPauseBtn.on('click', () => {
            if (!self.api.paused && self.api.playState && self.api.url) {
                self.pause();
            } else {
                self.play();
            }
        });
    }
    PlayersPlain.prototype = {
        /**
        * Play a song in the playlist.
        * @param  {Number} index Index of the song in the playlist (leave empty to play the first or current).
        */
        play() {
            // pause all players
            soundManager.pauseAll();

            // Begin playing the sound.
            this.api.play({
                url: this.url,
            });
        },

        /**
        * Pause the currently playing track.
        */
        pause() {
            // Puase the sound.
            soundManager.pauseAll();
        },
        /**
        * Seek to a new position in the currently playing track.
        * @param  {Number} per Percentage through the song to skip.
        */
        seek(per) {
            this.api.setPosition(this.api.duration * per);
        },
        /**
        * The step called within requestAnimationFrame to update the playback position.
        */
        step() {
            const self = this;
            // Determine our current seek position.
            const seek = self.api.position || 0;
            self.progress = seek / self.api.duration;
            self.$timer[0].innerHTML = self.formatTime(Math.round(seek));

            if (!$progressCont.data('busy')) {
                self.$progress[0].style.width = `${self.progress * 100 || 0}%`;
            }
        },

        /**
        * Format the time from seconds to M:SS.
        * @param  {Number} secs Seconds to format.
        * @return {String}      Formatted time.
        */
        formatTime(msec) {
            const secs = Math.round(msec / 1000) || 0;
            let minutes = Math.floor(secs / 60) || 0;
            minutes = (minutes < 10 ? '0' : 0) + minutes;
            const seconds = secs - minutes * 60;
            return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        },
    };

    // progress bar
    initAudioPlayerProgressBar();

    // add Enabled classes
    $player.addClass('nk-audio-player-main-enabled');
    $playersPlain.addClass('nk-audio-plain-enabled');

    const self = this;
    soundManager.onready(() => {
        if (playlist.length) {
            // find active playlist
            const activePlaylist = playlist.find(x => x.isActive);

            player = new Player({
                playlist: activePlaylist,
                start: 0,
                volume: 100,
                autoplay: $player.hasClass('nk-audio-player-autoplay'),
                pinned: $player.hasClass('nk-audio-player-pin'),
            });

            $player[0].audioAPI = player;
            self.audioPlayer = player;
        }

        if ($playersPlain.length) {
            $playersPlain.each(function eachPlayersPlain() {
                this.audioAPI = new PlayersPlain($(this));
            });
        }
    });
}

export { initAudioPlayer };
