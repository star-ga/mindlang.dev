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
  const button = document.querySelector('[data-action="sidebar-toggle"]');
  const menu = document.querySelector('.l-main__sidebar');
  const mq = window.matchMedia('(max-width: 64em)');

  if (!menu || typeof button === 'undefined') return;

  function widthChange(query) {
    button.setAttribute('aria-expanded', !query.matches);
  }

  button.addEventListener('click', () => {
    if (button.getAttribute('aria-expanded') === 'true') {
      button.setAttribute('aria-expanded', 'false');
      menu.classList.remove('l-main__sidebar--open');
    } else {
      button.setAttribute('aria-expanded', 'true');
      menu.classList.add('l-main__sidebar--open');
      menu.querySelector('a').focus();
    }
  });

  mq.addListener(widthChange);
  widthChange(mq);
})();
