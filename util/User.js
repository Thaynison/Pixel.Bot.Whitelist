module.exports = class User {
    constructor({ id, avatar, username, discriminator }) {
        this.avatar = avatar ? `https://cdn.discordapp.com/avatars/${id}/${avatar}${avatar.startsWith("a_") ? ".gif" : ".webp"}?size=128` : 'https://cdn.discordapp.com/embed/avatars/5.png';
        this.id = id;
        this.username = username;
        this.discriminator = discriminator;
        this.tag = `${username}#${discriminator}`;
    }
};
