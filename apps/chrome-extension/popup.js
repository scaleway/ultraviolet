// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const actionButton = document.getElementById('action')

// Retrieve the color from storage and update the button's style and value
chrome.storage.sync.get('state', ({ state }) => {
  actionButton.innerText = state ? 'Disable' : 'Enable'
  actionButton.setAttribute('value', state)
  console.log(state)
})

actionButton.addEventListener('click', event => {
  const state = !(event.target.value === 'true' ? true : false) // We reverse the state on click
  actionButton.innerText = state ? 'Disable' : 'Enable'
  actionButton.setAttribute('value', state)
  chrome.storage.sync.set({ state }, () => {
    console.log('State saved in storage.')
  })

  // Query the active tab before injecting the content script
  chrome.tabs.query({ active: true, currentWindow: true }, async tabs => {
    if (state) {
      console.log('state to true apply css')
      await chrome.scripting.insertCSS({
        files: ['highlight-components.css'],
        target: { tabId: tabs[0].id },
      })
    } else {
      await chrome.scripting.removeCSS({
        files: ['highlight-components.css'],
        target: { tabId: tabs[0].id },
      })
    }
  })
})
