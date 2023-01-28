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
        <td><a class="btn btn-danger btn-sm delete>X</a></td>
        `;

        list.appendChild(row);
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
        alert('Please fill in all fields');
    } else {
    // Instantiate Member
    const member = new Member(name, course, phone);
    // Add member to UI
    UI.addMemberToList(member);
    // Add member to Store
    Store.addMember(member);
    }
});

// Event: Remove Member

// Filter