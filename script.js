/* If you took a peek at this code you should know 
that it was made by Masiah :D As a headsup I am rusty with Java
please be kind as i know alot of this code sucks and is redudant.
please feel free to teach me the wonderful ways of Java and or 
buy me a cookie. I made this for Velocitor Soultions so its likley Matt, Rich, or the Legendairy Long bearded. man Tommy is reading this 
:D so Hello and I hope you enjoyed this entierly useless monolouge Also instead of a cookie I actually prefer Ice Cream and Cake
P.S I am dyslexic so there are probably many spelling errors in here

*/ 

`Use Strict`
const form = document.getElementById('ticket-form');
const inputIssue = document.getElementById('input-issue');
const inputNotes = document.getElementById('input-notes');
const autocompleteData = { /* ... your data as shown earlier ... */ }; 

inputIssue.addEventListener('keyup', () => {
    const issueText = inputIssue.value.toLowerCase(); 

    for (const keyword in autocompleteData) {
        if (issueText.includes(keyword)) {
            inputNotes.value = autocompleteData[keyword];
            break; // Stop if a match is found
        } else {
            inputNotes.value = ""; // Clear notes if no match
        }
    }
});








const inputResolution = document.getElementById('input-resolution');
const inputComments = document.getElementById('input-comments');
const issue = inputIssue.value; 
const notes = inputNotes.value; 
const resolution = inputResolution.value; 
const comments = inputComments.value; 
const outputText = document.getElementById('output-text');
outputText.innerHTML = formatTicketData(issue, notes, resolution, comments); 

const actualIssueValue = inputIssue.value;
const actualNotesValue = inputNotes.value; 
const actualResolutionValue = inputResolution.value; 
const actualCommentsValue = inputComments.value; 

const formattedText = formatTicketData(actualIssueValue, actualNotesValue, actualResolutionValue, actualCommentsValue);

form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const issue = inputIssue.value;
    const notes = inputNotes.value; 
    const resolution = inputResolution.value; 
    const comments = inputComments.value; 

    const formattedText = formatTicketData(issue, notes, resolution, comments); 
    outputText.innerHTML = formattedText; 
});




function formatTicketData(issue, notes, resolution, comments) {
    return `Issue - ${issue}<p> 
    These Steps Fixed the issue: ${notes}<p> 
    Extra Details / Customer informed: ${comments}<p> 
    Resolution - I resolved the issue by: ${resolution}`;
}



const copyButton = document.getElementById('copy-button');

copyButton.addEventListener('click', () => {
    const outputText = document.getElementById('output-text');
    let textToCopy = outputText.textContent; 

    // Temporary element for copying 
    const tempTextArea = document.createElement("textarea");
    tempTextArea.value = textToCopy;
    document.body.appendChild(tempTextArea);
    tempTextArea.select(); 

    try {
      document.execCommand('copy'); // Copy command 
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }

    document.body.removeChild(tempTextArea); 
});
