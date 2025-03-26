class User {
    constructor(uid, name, email, role, createdAt, updatedAt, deletedAt) {
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.role = role;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.deletedAt = deletedAt;
    }
}

class UserShow {
    constructor(uid, name, email, roleId) {
        this.uid = uid;
        this.name = name;
        this.email = email;
        this.roleId = roleId;
    }
}

module.exports = {
    User,
    UserShow,
};
