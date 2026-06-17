# WCAG Rules

## 1 Information and user interface components must be presentable to users in ways they can perceive.

### 1.1 Provide text alternatives for any non-text content so that it can be changed into other forms people need, such as large print, braille, speech, symbols or simpler language.

- 1.1.1 All non-text content that is presented to the user has a text alternative that serves the equivalent purpose, except for the situations listed below.

### 1.2 Provide alternatives for time-based media.

- 1.2.1 For prerecorded audio-only and prerecorded video-only media, the following are true, except when the audio or video is a media alternative for text and is clearly labeled as such:
- 1.2.2 Captions are provided for all prerecorded audio content in synchronized media, except when the media is a media alternative for text and is clearly labeled as such.
- 1.2.3 An alternative for time-based media or audio description of the prerecorded video content is provided for synchronized media, except when the media is a media alternative for text and is clearly labeled as such.
- 1.2.4 Captions are provided for all live audio content in synchronized media.
- 1.2.5 Audio description is provided for all prerecorded video content in synchronized media.
- 1.2.6 Sign language interpretation is provided for all prerecorded audio content in synchronized media.
- 1.2.7 Where pauses in foreground audio are insufficient to allow audio descriptions to convey the sense of the video, extended audio description is provided for all prerecorded video content in synchronized media.
- 1.2.8 An alternative for time-based media is provided for all prerecorded synchronized media and for all prerecorded video-only media.
- 1.2.9 An alternative for time-based media that presents equivalent information for live audio-only content is provided.

### 1.3 Create content that can be presented in different ways (for example simpler layout) without losing information or structure.

- 1.3.1 Information, structure, and relationships conveyed through presentation can be programmatically determined or are available in text.
- 1.3.2 When the sequence in which content is presented affects its meaning, a correct reading sequence can be programmatically determined.
- 1.3.3 Instructions provided for understanding and operating content do not rely solely on sensory characteristics of components such as shape, color, size, visual location, orientation, or sound.
- 1.3.4 Content does not restrict its view and operation to a single display orientation, such as portrait or landscape, unless a specific display orientation is essential.
- 1.3.5 The purpose of each input field collecting information about the user can be programmatically determined when:
- 1.3.6 In content implemented using markup languages, the purpose of user interface components, icons, and regions can be programmatically determined.

### 1.4 Make it easier for users to see and hear content including separating foreground from background.

- 1.4.1 Color is not used as the only visual means of conveying information, indicating an action, prompting a response, or distinguishing a visual element.
- 1.4.2 If any audio on a web page plays automatically for more than 3 seconds, either a mechanism is available to pause or stop the audio, or a mechanism is available to control audio volume independently from the overall system volume level.
- 1.4.3 The visual presentation of text and images of text has a contrast ratio of at least 4.5:1, except for the following:
- 1.4.4 Except for captions and images of text, text can be resized without assistive technology up to 200 percent without loss of content or functionality.
- 1.4.5 If the technologies being used can achieve the visual presentation, text is used to convey information rather than images of text except for the following:
- 1.4.6 The visual presentation of text and images of text has a contrast ratio of at least 7:1, except for the following:
- 1.4.7 For prerecorded audio-only content that (1) contains primarily speech in the foreground, (2) is not an audio CAPTCHA or audio logo, and (3) is not vocalization intended to be primarily musical expression such as singing or rapping, at least one of the following is true:
- 1.4.8 For the visual presentation of blocks of text, a mechanism is available to achieve the following:
- 1.4.9 Images of text are only used for pure decoration or where a particular presentation of text is essential to the information being conveyed.
- 1.4.10 Content can be presented without loss of information or functionality, and without requiring scrolling in two dimensions for:
- 1.4.11 The visual presentation of the following have a contrast ratio of at least 3:1 against adjacent color(s):
- 1.4.12 In content implemented using markup languages that support the following text style properties, no loss of content or functionality occurs by setting all of the following and by changing no other style property:
- 1.4.13 Where receiving and then removing pointer hover or keyboard focus triggers additional content to become visible and then hidden, the following are true:

## 2 User interface components and navigation must be operable.

### 2.1 Make all functionality available from a keyboard.

- 2.1.1 All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes, except where the underlying function requires input that depends on the path of the user's movement and not just the endpoints.
- 2.1.2 If keyboard focus can be moved to a component of the page using a keyboard interface, then focus can be moved away from that component using only a keyboard interface, and, if it requires more than unmodified arrow or tab keys or other standard exit methods, the user is advised of the method for moving focus away.
- 2.1.3 All functionality of the content is operable through a keyboard interface without requiring specific timings for individual keystrokes.
- 2.1.4 If a keyboard shortcut is implemented in content using only letter (including upper- and lower-case letters), punctuation, number, or symbol characters, then at least one of the following is true:

### 2.2 Provide users enough time to read and use content.

- 2.2.1 For each time limit that is set by the content, at least one of the following is true:
- 2.2.2 For moving, blinking, scrolling, or auto-updating information, all of the following are true:
- 2.2.3 Timing is not an essential part of the event or activity presented by the content, except for non-interactive synchronized media and real-time events.
- 2.2.4 Interruptions can be postponed or suppressed by the user, except interruptions involving an emergency.
- 2.2.5 When an authenticated session expires, the user can continue the activity without loss of data after re-authenticating.
- 2.2.6 Users are warned of the duration of any user inactivity that could cause data loss, unless the data is preserved for more than 20 hours when the user does not take any actions.

### 2.3 Do not design content in a way that is known to cause seizures or physical reactions.

- 2.3.1 Web pages do not contain anything that flashes more than three times in any one second period, or the flash is below the general flash and red flash thresholds.
- 2.3.2 Web pages do not contain anything that flashes more than three times in any one second period.
- 2.3.3 Motion animation triggered by interaction can be disabled, unless the animation is essential to the functionality or the information being conveyed.

### 2.4 Provide ways to help users navigate, find content, and determine where they are.

- 2.4.1 A mechanism is available to bypass blocks of content that are repeated on multiple web pages.
- 2.4.2 Web pages have titles that describe topic or purpose.
- 2.4.3 If a web page can be navigated sequentially and the navigation sequences affect meaning or operation, focusable components receive focus in an order that preserves meaning and operability.
- 2.4.4 The purpose of each link can be determined from the link text alone or from the link text together with its programmatically determined link context, except where the purpose of the link would be ambiguous to users in general.
- 2.4.5 More than one way is available to locate a web page within a set of web pages except where the web page is the result of, or a step in, a process.
- 2.4.6 Headings and labels describe topic or purpose.
- 2.4.7 Any keyboard operable user interface has a mode of operation where the keyboard focus indicator is visible.
- 2.4.8 Information about the user's location within a set of web pages is available.
- 2.4.9 A mechanism is available to allow the purpose of each link to be identified from link text alone, except where the purpose of the link would be ambiguous to users in general.
- 2.4.10 Section headings are used to organize the content.
- 2.4.11 When a user interface component receives keyboard focus, the component is not entirely hidden due to author-created content.
- 2.4.12 When a user interface component receives keyboard focus, no part of the component is hidden by author-created content.
- 2.4.13 When the keyboard focus indicator is visible, an area of the focus indicator meets all the following:

### 2.5 Make it easier for users to operate functionality through various inputs beyond keyboard.

- 2.5.1 All functionality that uses multipoint or path-based gestures for operation can be operated with a single pointer without a path-based gesture, unless a multipoint or path-based gesture is essential.
- 2.5.2 For functionality that can be operated using a single pointer, at least one of the following is true:
- 2.5.3 For user interface components with labels that include text or images of text, the name contains the text that is presented visually.
- 2.5.4 Functionality that can be operated by device motion or user motion can also be operated by user interface components and responding to the motion can be disabled to prevent accidental actuation, except when:
- 2.5.5 The size of the target for pointer inputs is at least 44 by 44 CSS pixels except when:
- 2.5.6 Web content does not restrict use of input modalities available on a platform except where the restriction is essential, required to ensure the security of the content, or required to respect user settings.
- 2.5.7 All functionality that uses a dragging movement for operation can be achieved by a single pointer without dragging, unless dragging is essential or the functionality is determined by the user agent and not modified by the author.
- 2.5.8 The size of the target for pointer inputs is at least 24 by 24 CSS pixels, except when:

## 3 Information and the operation of the user interface must be understandable.

### 3.1 Make text content readable and understandable.

- 3.1.1 The default human language of each web page can be programmatically determined.
- 3.1.2 The human language of each passage or phrase in the content can be programmatically determined except for proper names, technical terms, words of indeterminate language, and words or phrases that have become part of the vernacular of the immediately surrounding text.
- 3.1.3 A mechanism is available for identifying specific definitions of words or phrases used in an unusual or restricted way, including idioms and jargon.
- 3.1.4 A mechanism for identifying the expanded form or meaning of abbreviations is available.
- 3.1.5 When text requires reading ability more advanced than the lower secondary education level after removal of proper names and titles, supplemental content, or a version that does not require reading ability more advanced than the lower secondary education level, is available.
- 3.1.6 A mechanism is available for identifying specific pronunciation of words where meaning of the words, in context, is ambiguous without knowing the pronunciation.

### 3.2 Make web pages appear and operate in predictable ways.

- 3.2.1 When any user interface component receives focus, it does not initiate a change of context.
- 3.2.2 Changing the setting of any user interface component does not automatically cause a change of context unless the user has been advised of the behavior before using the component.
- 3.2.3 Navigational mechanisms that are repeated on multiple web pages within a set of web pages occur in the same relative order each time they are repeated, unless a change is initiated by the user.
- 3.2.4 Components that have the same functionality within a set of web pages are identified consistently.
- 3.2.5 Changes of context are initiated only by user request or a mechanism is available to turn off such changes.
- 3.2.6 If a web page contains any of the following help mechanisms, and those mechanisms are repeated on multiple web pages within a set of web pages, they occur in the same order relative to other page content, unless a change is initiated by the user:

### 3.3 Help users avoid and correct mistakes.

- 3.3.1 If an input error is automatically detected, the item that is in error is identified and the error is described to the user in text.
- 3.3.2 Labels or instructions are provided when content requires user input.
- 3.3.3 If an input error is automatically detected and suggestions for correction are known, then the suggestions are provided to the user, unless it would jeopardize the security or purpose of the content.
- 3.3.4 For web pages that cause legal commitments or financial transactions for the user to occur, that modify or delete user-controllable data in data storage systems, or that submit user test responses, at least one of the following is true:
- 3.3.5 Context-sensitive help is available.
- 3.3.6 For web pages that require the user to submit information, at least one of the following is true:
- 3.3.7 Information previously entered by or provided to the user that is required to be entered again in the same process is either:
- 3.3.8 A cognitive function test (such as remembering a password or solving a puzzle) is not required for any step in an authentication process unless that step provides at least one of the following:
- 3.3.9 A cognitive function test (such as remembering a password or solving a puzzle) is not required for any step in an authentication process unless that step provides at least one of the following:

## 4 Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies.

### 4.1 Maximize compatibility with current and future user agents, including assistive technologies.

- 4.1.1 This criterion was originally adopted to address problems that assistive technology had directly parsing HTML. Assistive technology no longer has any need to directly parse HTML. Consequently, these problems either no longer exist or are addressed by other criteria. This criterion no longer has utility and is removed.
- 4.1.2 For all user interface components (including but not limited to: form elements, links and components generated by scripts), the name and role can be programmatically determined; states, properties, and values that can be set by the user can be programmatically set; and notification of changes to these items is available to user agents, including assistive technologies.
- 4.1.3 In content implemented using markup languages, status messages can be programmatically determined through role or properties such that they can be presented to the user by assistive technologies without receiving focus.
