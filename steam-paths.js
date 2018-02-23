'use strict'

const fs = require('fs')
const path = require('path')
const platform = require('os').platform()

function SteamPaths () {
  let id64 = 0
  let accountId = 0
  let rootPathOf = ''

  let obj = {
    get rootPath () {
      return rootPathOf
    },
    set rootPath (to) {
      if (!to || to === '') {
        throw new Error(`${to} is an invalid root path.`)
      } else if (!fs.existsSync(to)) {
        throw new Error(`${to} is an invalid root path because it does not exist.`)
      }

      rootPathOf = to
    },
    get id64 () {
      return id64
    },
    set id64 (to) {
      if (typeof to !== 'string') {
        throw new Error(`${to} with type ${typeof to} is an invalid id64.`)
      }

      id64 = to
    },
    get accountId () {
      return accountId
    },
    set accountId (to) {
      if (typeof to !== 'string') {
        throw new Error(`${to} with type ${typeof to} is an invalid accountId.`)
      }

      accountId = to
    },

    get all () {
      return Object.keys(this)
        .filter(k => k !== 'rootPath' && k !== 'id64' && k !== 'accountId' && k !== 'all' && k !== 'app' && k !== 'steamapps')
        .map(k => this[ k ])
    },
    set all (to) {
    },

    app: function (appid, library) {
      let appPath

      if (!appid) {
        throw new Error('Need an appid to get the path to an app')
      } else if (!library) {
        library = path.join(rootPathOf, 'steamapps')
      }

      if (!fs.existsSync(library)) {
        throw new Error(`Library path ${library} does not exist. If it is on an external drive make sure it is properly plugged in and mounted and try again.`)
      }

      appPath = path.join(library, `appmanifest_${appid}.acf`)

      if (!fs.existsSync(appPath)) {
        throw new Error(`App file ${appPath} does not exist.`)
      }

      return appPath
    },
    get appinfo () {
      let tmp = path.join(rootPathOf, 'appcache', 'appinfo.vdf')
      if (!fs.existsSync(tmp)) {
        throw new Error(`File ${tmp} does not exist.`)
      }

      return tmp
    },
    set appinfo (to) {
    },
    get config () {
      let tmp = path.join(rootPathOf, 'config', 'config.vdf')
      if (!fs.existsSync(tmp)) {
        throw new Error(`File ${tmp} does not exist.`)
      }

      return tmp
    },
    set config (to) {
    },
    get libraryfolders () {
      let tmp = path.join(rootPathOf, 'steamapps', 'libraryfolders.vdf')
      if (!fs.existsSync(tmp)) {
        throw new Error(`File ${tmp} does not exist.`)
      }

      return tmp
    },
    set libraryfolders (to) {
    },
    get localconfig () {
      let tmp = path.join(rootPathOf, 'userdata', accountId, 'config', 'localconfig.vdf')
      if (!fs.existsSync(tmp)) {
        throw new Error(`File ${tmp} does not exist.`)
      }

      return tmp
    },
    set localconfig (to) {
    },
    get loginusers () {
      let tmp = path.join(rootPathOf, 'config', 'loginusers.vdf')
      if (!fs.existsSync(tmp)) {
        throw new Error(`File ${tmp} does not exist.`)
      }

      return tmp
    },
    set loginusers (to) {
    },
    get registry () {
      let tmp
      switch (platform) {
        case 'win32':
          tmp = 'winreg'
          break

        case 'darwin':
          tmp = path.join(rootPathOf, 'registry.vdf')
          if (!fs.existsSync(tmp)) {
            throw new Error(`File ${tmp} does not exist.`)
          }
          break

        case 'linux':
          tmp = path.join(rootPathOf, '..', 'registry.vdf')
          if (!fs.existsSync(tmp)) {
            throw new Error(`File ${tmp} does not exist.`)
          }
      }

      return tmp
    },
    set registry (to) {
    },
    get sharedconfig () {
      let tmp = path.join(rootPathOf, 'userdata', accountId, '7', 'remote', 'sharedconfig.vdf')
      if (!fs.existsSync(tmp)) {
        throw new Error(`File ${tmp} does not exist.`)
      }

      return tmp
    },
    set sharedconfig (to) {
    },
    get shortcuts () {
      let tmp = path.join(rootPathOf, 'userdata', accountId, 'config', 'shortcuts.vdf')
      if (!fs.existsSync(tmp)) {
        throw new Error(`File ${tmp} does not exist.`)
      }

      return tmp
    },
    set shortcuts (to) {
    },
    get skins () {
      let tmp

      switch (platform) {
        case 'win32':
        case 'linux':
          tmp = path.join(rootPathOf, 'skins')
          break

        case 'darwin':
          tmp = path.join(rootPathOf, 'Steam.AppBundle', 'Steam', 'Contents', 'MacOS', 'skins')
          break
      }

      if (!fs.existsSync(tmp)) {
        throw new Error(`File ${tmp} does not exist.`)
      }

      return tmp
    },
    set skins (to) {

    },
    steamapps: function (library) {
      if (!library) {
        library = rootPathOf
      }

      library = path.join(library, 'steamapps')

      if (!fs.existsSync(library)) {
        throw new Error(`'${library}/steamapps' folder does not exist.`)
      }

      return library
    }
  }

  return obj
}

module.exports = SteamPaths