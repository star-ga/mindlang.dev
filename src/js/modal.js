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
  let activeElement = null;
  const siteWrapper = document.querySelector('.site-wrapper');
  const button = document.querySelector('[data-action="open-search"]');
  const input = document.querySelector('.pagefind-ui__search-input');
  const modal = document.querySelector('.modal-backdrop');

  if (!button || !modal) return;

  function openModal() {
    activeElement = document.activeElement;
    siteWrapper.setAttribute('inert', '');
    modal.classList.add('modal-backdrop--open');
    input.focus();
  }

  function closeModal() {
    siteWrapper.removeAttribute('inert');
    modal.classList.remove('modal-backdrop--open');
    activeElement.focus();
  }

  function handleKeyDown(e) {
    if (e.code === 'Escape') {
      closeModal();
    }

    if (e.ctrlKey && e.code === 'KeyK') {
      e.preventDefault();
      openModal();
    }
  }

  modal.addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  });

  button.addEventListener('click', () => {
    openModal();
  });

  window.addEventListener('keydown', handleKeyDown);
})();
