/*
 * Copyright 2025 STARGA Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at:
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(() => {
  document.querySelectorAll('.accordion-card').forEach((accordion) => {
    const heading = accordion.querySelector('.accordion-card__title');

    accordion.classList.add('accordion-card--js');

    heading.nextElementSibling.hidden = true;
    heading.innerHTML = `
      <button class="accordion-card__toggle" aria-expanded="false">
        ${heading.textContent}
        <svg aria-hidden="true" focusable="false" height="18px" viewBox="0 0 18 18" width="18px">
          <path d="M13.5,8.625c0,-0.207 -0.168,-0.375 -0.375,-0.375l-8.25,0c-0.207,0 -0.375,0.168 -0.375,0.375l0,0.75c0,0.207 0.168,0.375 0.375,0.375l8.25,0c0.207,0 0.375,-0.168 0.375,-0.375l0,-0.75Z" style="fill:currentColor;"/>
          <path class="vertical-line" d="M9.375,13.5c0.207,-0 0.375,-0.168 0.375,-0.375l0,-8.25c0,-0.207 -0.168,-0.375 -0.375,-0.375l-0.75,0c-0.207,0 -0.375,0.168 -0.375,0.375l-0,8.25c-0,0.207 0.168,0.375 0.375,0.375l0.75,-0Z" style="fill:currentColor;"/>
        </svg>
      </button>
    `;

    const btn = heading.querySelector('button');

    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';

      btn.setAttribute('aria-expanded', !expanded);
      heading.nextElementSibling.hidden = expanded;
    });
  });
})();
