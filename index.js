const bcrypt = require('bcryptjs');

const abc = async () => {
    const salt = await bcrypt.genSalt(10);
    console.log(await bcrypt.hash('tahir123',salt))

}

abc()