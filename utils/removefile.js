const { unlinkSync } = require("node:fs");

function removeFile(localPath) {
	const fullPath = `${process.cwd()}/${localPath}`;
	unlinkSync(fullPath, (err) => {
		if (err) throw new Error(err);
		console.log(`The file at path ${localPath} is deleted successfully`);
	});
}

module.exports = { removeFile };
