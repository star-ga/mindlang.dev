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
  const systemMode = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  const preferredTheme = localStorage.getItem('preferred-theme');

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme-mode', theme === 'system' ? systemMode : theme);
  }

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (localStorage.getItem('preferred-theme') === 'system' || localStorage.getItem('preferred-theme') === null) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    });

  setTheme(preferredTheme || systemMode);
})();
