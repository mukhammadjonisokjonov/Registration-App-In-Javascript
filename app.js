// Class Member: Represents Member
class Member{
    constructor(name, course, phone) {
        this.name = name;
        this.course = course;
        this.phone = phone;
    }
}

// Class UI: Handles UI Tasks
class UI {
    static displayMembers() {
        const members = Store.getMembers();
        members.forEach((member) => UI.addMemberToList(member));
    }

    static addMemberToList(member) {
        const list = document.querySelector('#member-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${member.name}</td>
        <td>${member.course}</td>
        <td>${member.phone}</td>
        <td><a class="btn btn-danger btn-sm delete">X</a></td>`;

        list.appendChild(row);
    }

    static clearFields() {
        document.querySelector('#name').value = '';
        document.querySelector('#course').value = '';
        document.querySelector('#phone').value = '';
    }

    static deleteMember(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const card = document.querySelector('.card');
        const form = document.querySelector('#member-form');
        card.insertBefore(div, form);

        setTimeout(() => document.querySelector('.alert').remove(), 3000)
    }
}

// Class Store: Handles Storage
class Store {
    static getMembers() {
        let members;
        if(localStorage.getItem('members') === null) {
            members = [];
        } else {
            members = JSON.parse(localStorage.getItem('members'));
        }

        return members;
    }

    static addMember(member) {
        const members = Store.getMembers();
        members.push(member);
        localStorage.setItem('members', JSON.stringify(members));
    }

    static removeMember(phone) {
        const members = Store.getMembers();

        members.forEach((member, index) => {
            if(member.phone === phone) {
                members.splice(index, 1);
            }
        });  
        
        localStorage.setItem('members', JSON.stringify(members));
    }
}

// Event: Display a Member
document.addEventListener('DOMContentLoaded', UI.displayMembers);

// Event: Add Member
document.querySelector('#member-form').addEventListener('submit', (e) => 
{
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const name = document.querySelector('#name').value;
    const course = document.querySelector('#course').value;
    const phone = document.querySelector('#phone').value;

    // Validate
    if(name === '' || course === '' || phone === '') {
        UI.showAlert('Please fill in all fields', 'danger');
    } else {
    // Instantiate Member
    const member = new Member(name, course, phone);

    // Add member to UI
    UI.addMemberToList(member);

    // Add member to Store
    Store.addMember(member);

    // Show success message
    UI.showAlert('Register Completed', 'success');

    // Clear fields
    UI.clearFields();
    }
});

// Event: Remove Member
document.querySelector('#member-list').addEventListener('click', (e) =>
{
    // Remove member from UI
    UI.deleteMember(e.target);

    // Remove member from store
    Store.removeMember
    (e.target.parentElement.previousElementSibling.textContent);

    // Show success message
    UI.showAlert('Member Removed', 'success');
});

// Filter
const filter = document.getElementById('filter');

// Filter Event
filter.addEventListener('keyup', filterUsers);

// Filter members
function filterUsers(e) {
    // Convert text to lower case
    const text = e.target.value.toLowerCase();
    // Get tags
    const list = document.querySelector('#member-list');
    const users = list.getElementsByTagName('tr');

    // Convert to an array
    Array.from(users).forEach(function(user){
        const userName = user.firstElementChild.textContent;
        if(userName.toLowerCase().indexOf(text) != -1){
            user.style.display = '';
        } else {
            user.style.display = 'none';
        }
    });
}