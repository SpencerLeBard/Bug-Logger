# Bug-Report

Welcome to the Bug-Report!

You have been tasked with creating a tool to better report bugs for your team. The goal being, to better track bugs in your application, as well as the process taken to solve them.

All bugs will have a title, description, who reported the bug, closedDate and whether or not it has been closed.

Users can also add notes to the bug report providing detailed steps towards the bugs resolution.

Once a bug has been closed, no further editing is allowed.

Here are some mock-ups from the client.

<hr>

### Home View:


From the Home page users can view all the bugs that have been added, color coded to which are open and closed(by status). You should be able to filter the bugs based on their status(open or closed).


### Details View:


The details view provides some additional information about the bug, as well as showing all the notes made by other users. Here notes can be created or removed.


## Bug-Report API

### Bug Schema

```Javascript
var bug = new Schema({
    closed: { type: Boolean, required: true, default: false },
    description: { type: String, required: true },
    title: { type: String, required: true },
    closedDate: { type: Date}
    creatorEmail: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })
```

### Note Schema

```Javascript
var note = new Schema({
    content: { type: String, required: true },
    bug: { type: ObjectId, ref: 'Bug' required: true },
    flagged: { type: String, enum: ["pending", "completed", "rejected"] }
    creatorEmail: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })
```

### Suggested Endpoints

> baseUrl: `'https://localhost:3000/api'`

Get

`/bugs`: returns a list of all the bugs

`/bugs/:id`: returns a single bug with all it's data

`/bugs/:id/notes`: returns all notes for a given bug id

Post

`/bugs`: Creates a new bug

`/notes`: Adds a new note to the bug.

Put

> _both of these can only be done if bug is open_

`/bugs/:id`: Edits bug

`/notes/:id`: Edits note. (not required)

Delete

> There is no true bug delete, only changing the status of a bug to closed.

`/bugs/:id`: Changes status of bug from open to close

`notes/:id`: Deletes note.

<hr>

## Requirements

### Saturday/Sunday

1 BugDetails displays the details of a bug and its Notes /// NOTE GET NOTE BY BUGID IN SERVER

### Monday

- Bugs can be closed from the BugDetails view

### Easy Monday
* User is prompted "are you sure?" when closing a Bug ///// NOTE SweetAlerts setup and ready
- Cannot edit a Bug after it is closed //NOTE if statment made and ready
* Bugs display last modified date //NOTE change to normal date/time

### L's
X Bugs can be filtered by their status ||| 
X Styling Indication on main page that bug is closed (color, strike-through, etc.)



