import './style/main.css';
import './style/fonts.css';
import './style/extra.css';
import './style/ship.css';

import { place_ships, login_form, help_panel, lay_gameboard, display_winner } from './modules/renderPages';
import { initPlacement } from './modules/shipPlacement';
import { game_engine, winner } from './modules/gameEngine';


document.addEventListener('DOMContentLoaded', () => {
    console.log('Battleship is ready to sail!');

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
            initPlacement();

            document.getElementById("details").addEventListener('click', () => {
                render_page("help_panel");
            });

            document.getElementById("confirm-plan").addEventListener('click', () => {
                render_page("start-game");
            });

        }else if(curr_page === "start-game"){
            render_content.innerHTML = lay_gameboard(cap_name);

            game_engine();
        }else if(curr_page === "display_winner"){
            render_content.innerHTML = display_winner();

            document.querySelector(".restart").addEventListener('click', () => {
                render_page("place_ships");
            });
            document.querySelector(".exit").addEventListener('click', () => {
                render_page("login");
            });
        } else if (curr_page === "help_panel") {
            render_content.innerHTML = help_panel();

            document.querySelector(".close-help").addEventListener('click', () => {
                render_page("place_ships");
            });
        }
    }

    render_page(); 
});


export default render_page;