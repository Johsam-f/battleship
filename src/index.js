import './style/main.css';
import './style/fonts.css';
import './style/extra.css';
import './style/ship.css';

import { place_ships, login_form, help_panel, lay_gameboard, display_winner } from './modules/renderPages';
import { resetPlacement, initPlacement } from './modules/shipPlacement';
import { game_engine, winner } from './modules/gameEngine';
import bgMusic from './assets/audio/Battle-of-Courage.mp3'

document.addEventListener('DOMContentLoaded', () => {
    console.log('Battleship is ready to sail!');
    const audio = new Audio(bgMusic);
    audio.loop = true;
    audio.volume = 0.8;
    document.addEventListener('click', () => {
        audio.play().catch(err => console.log('Autoplay blocked:', err));
      }, { once: true });

    let isMuted = false;
    const toggleBtn = document.getElementById('toggle-music');
    const icon = toggleBtn.querySelector('.volume');

    toggleBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        audio.muted = isMuted;
      
        icon.classList.toggle('fa-volume-up', !isMuted);
        icon.classList.toggle('fa-volume-mute', isMuted);
    });

    let cap_name;

    function render_page(curr_page = "login") {
        let render_content = document.getElementById("render-content");

        if (curr_page === "login") {
            render_content.innerHTML = login_form();

            document.getElementById("submit-name").addEventListener('submit', (e) => {
                e.preventDefault();
                cap_name = document.querySelector("#cap-name").value.trim();
                if (cap_name) {
                    render_page("place_ships");
                }
            });

        } else if (curr_page === "place_ships") {
            render_content.innerHTML = place_ships(cap_name);
            resetPlacement();
            initPlacement();

            document.getElementById("details").addEventListener('click', () => {
                render_page("help_panel");
            });

            document.getElementById("confirm-plan").addEventListener('click', () => {
                render_page("start-game");
            });

        }else if (curr_page === "start-game") {
            const controller = new AbortController();
            
            render_content.innerHTML = lay_gameboard(cap_name);
            
            // Set up self-removing listeners 
            // need to understand more about removing event listners for dynamic rendering 
            document.getElementById("exit-btn")?.addEventListener('click', () => {
                controller.abort();
                render_page("login");
            }, { signal: controller.signal });
            
            document.addEventListener('gameEnded', () => {
                controller.abort();
                const winner_board = document.getElementById("display-winner");
                winner_board.innerHTML = display_winner(winner);
                const unhide_board = document.getElementById("winner-modal");
                unhide_board.classList.remove("hide");
                unhide_board.classList.add("unhide");

                document.querySelector(".restart").addEventListener('click', () => {
                    render_page("place_ships");
                });
                document.querySelector(".exit").addEventListener('click', () => {
                    render_page("login");
                });
            }, { signal: controller.signal });
            
            //seems to be running before lay_gameboard has finished, 
            // making eventlistener not to find the required button
                game_engine();
        }else if (curr_page === "help_panel") {
            render_content.innerHTML = help_panel();

            document.querySelector(".close-help").addEventListener('click', () => {
                render_page("place_ships");
            });
        }
    }

    render_page(); 
});

