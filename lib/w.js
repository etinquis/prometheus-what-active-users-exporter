'use strict'

const { execFile } = require('child_process')
const { platform } = require('os')

let shell = false

if (platform().includes('win')) {
    process.env.comspec = 'C:\\Program Files\\Git\\git-bash.exe'
    shell = 'bash'
}

if (process.env.NODE_ENV === 'ci' || platform().includes('win')) {
    module.exports = () => {
        return Promise.resolve(`23:50:13 up 1 day, 11:33,  1 user,  load average: 0.08, 0.03, 0.01
            USER     TTY      FROM             LOGIN@   IDLE   JCPU   PCPU WHAT
            pi       pts/0    192.168.2.107    23:50    1.00s  0.15s  0.01s w
    `)
    }
} else {
    module.exports = () => {
        return new Promise((resolve, reject) => {
            execFile('w', ['-i'], {
                shell
            }, (err, stdout, stderr) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(stdout)
                }
            })
        })
    }
}