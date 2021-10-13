const c = require('chalk')
const shell = require('shelljs')

const { argv } = process
if (argv.length !== 3) {
	console.error(c.magenta('Must specify 1 argument for commit name'))
	process.exit(1)
}

const m = argv[2]

shell.exec('git add -A')
shell.exec(`git commit -m "${m}"`)
shell.exec('git push')
