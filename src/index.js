import './style/main.css';
import './style/fonts.css';
import './style/extra.css';
import './style/ship.css';

import { place_ships, login_form, help_panel } from './modules/renderPages';
import { initPlacement } from './modules/shipPlacement';

document.addEventListener('DOMContentLoaded', () => {
    console.log('Battleship is ready to sail!');

    let cap_name;

    function render_page(curr_page = "place_ships") {
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
            initPlacement(); // Hook up click-to-place logic

            document.getElementById("details").addEventListener('click', () => {
                render_page("help_panel");
            });

        } else if (curr_page === "help_panel") {
            render_content.innerHTML = help_panel();

            document.querySelector(".close-help").addEventListener('click', () => {
                render_page("place_ships");
            });
        }
    }

    render_page(); // Start at login page
});
