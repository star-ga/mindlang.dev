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
  const htmlElement = document.querySelector('html');
  const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

  function changeAssets(theme) {
    if (!theme) return;
    const themeAssets = document.querySelectorAll('img[data-theme-mode]');

    themeAssets.forEach((el) => {
      el.src = el.getAttribute(`data-${theme}-asset`);
    });
  }

  changeAssets(htmlElement.getAttribute('data-theme-mode') === 'system' ? systemMode : htmlElement.getAttribute('data-theme-mode'));

  const observer = new MutationObserver(() => {
    changeAssets(htmlElement.getAttribute('data-theme-mode') === 'system' ? systemMode : htmlElement.getAttribute('data-theme-mode'));
  });

  observer.observe(htmlElement, { attributes: true });
})();
