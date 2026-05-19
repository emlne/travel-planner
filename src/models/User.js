const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // Şifreleri şifrelemek için

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Ad alanı zorunludur'],
        trim: true,
        maxlength: [50, 'İsim alanı 50 karakterden büyük olamaz.']
    },
    email: {
        type: String,
        required: [true, 'Email adresi zorunludur'],
        unique: true, // Aynı email ile ikinci kayıt yapılamaz
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, 'Şifre zorunludur'],
        minlength: 6,
        select: false, // Veritabanından kullanıcı çekildiğinde şifre otomatik gelmesin (güvenlik)
        validate: {
            validator: function (value) {
                // Regex Açıklaması:
                // (?=.*[A-Z]) -> En az bir büyük harf
                // (?=.*[!@#$%^&*]) -> En az bir özel işaret
                return /^(?=.*[A-Z])(?=.*[!@#$%^&*])/.test(value);
            },
            message: 'Şifre en az bir büyük harf ve bir özel karakter (!@#$%^&*) içermelidir.'
        }
    },
    role: {
        type: String,
        enum: ['user','admin'],
        default: 'user'
    }
}, { timestamps: true });

// Şifreyi veritabanına kaydetmeden hemen önce otomatik şifrele (Hashleme)
userSchema.pre('save', async function () {
    // Şifre değişmemişse hiçbir şey yapmadan çık (return)
    if (!this.isModified('password')) return;

    // Şifreyi hashle
    this.password = await bcrypt.hash(this.password, 12);
});

// Girilen şifre ile veritabanındaki şifreyi karşılaştıran yardımcı fonksiyon
userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('User', userSchema);