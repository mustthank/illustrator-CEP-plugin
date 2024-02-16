function getNameOfThePath(e) {
  return PATH.basename(PATH.normalize(e));
}
function normalizePath(e) {
  try {
    return PATH.normalize(PATH.normalize(e)).replace(/\\/g, "/");
  } catch (e) {
    alert("normalizePath() - error: " + e);
  }
}
function getDirname(e) {
  try {
    return PATH.normalize(PATH.dirname(e));
  } catch (e) {
    alert("getDirname() - error: " + e);
  }
}
function getFolderName(e) {
  try {
    return (
      (e = e.gsep()),
      PATH.normalize(e.replace(PATH.dirname(e), "").replace(/\//g, ""))
    );
  } catch (e) {
    alert("getFolderName() - error: " + e);
  }
}
function uniquePath(e, t) {
  try {
    if (((t = t || "_copy"), !fs.existsSync(e))) return e;
    if (isFile(e)) {
      var o = PATH.extname(e),
        r = PATH.basename(e).replace(o, "");
      if ((s = prompt("File is exists! Please rename file!", r + t)))
        return uniquePath(e.replace(r, s));
    } else if (isDir(e)) {
      var s;
      r = getFolderName(e);
      if ((s = prompt("File is exists! Please rename file!", r + t)))
        return uniquePath(e.replace(r, s));
    }
    return !1;
  } catch (e) {
    alert("uniquePath() - error: " + e);
  }
}
function isFile(e, t) {
  try {
    if (!fs.existsSync(e)) return !1;
    var o = cep.fs.stat(e).data.isFile();
    return t instanceof Function && t(o), o;
  } catch (e) {
    alert("isFile() - error: " + e);
  }
}
function readFile(t, o) {
  try {
    var e = cep.fs.readFile(t).data;
    return o && e ? JSON.parse(e) : e;
  } catch (e) {
    alert("readFile(" + t + ", " + o + ") - error: " + e);
  }
}
function saveFile(e, t, o, r, s) {
  try {
    o && t && (t = JSON.stringify(t, null, 4)),
      cep.fs.writeFile(e, t, s),
      r instanceof Function && r(e, t, o);
  } catch (e) {
    alert("saveFile() - error: " + e);
  }
}
function removeFile(e, t) {
  try {
    fs.unlink(
      e,
      t instanceof Function
        ? t
        : function (e) {
            e && alert("removeFile() => (err): " + e);
          }
    );
  } catch (e) {
    alert("removeFile() - error: " + e);
  }
}
function chooseFiles(e, t, o, r, s) {
  try {
    var n = "";
    t = "string" == typeof t ? t.replace(/ /g, "").split(",") : "";
    for (var a = 0; a < t.length; a++) n += "*." + t[a];
    var c = cep.fs.showOpenDialogEx(
      r || !1,
      !1,
      "string" == typeof o ? o : "Choose files..",
      "string" == typeof e ? e : "",
      t,
      n
    ).data;
    r || (c = c[0]);
    for (a = 0; a < arguments.length; a++)
      arguments[a] instanceof Function &&
        arguments[a](c, { path: e, types: t, title: o });
    return c;
  } catch (e) {
    alert("chooseFiles() - error: " + e);
  }
}
function isDir(e, t) {
  try {
    if (!fs.existsSync(e)) return !1;
    var o = cep.fs.stat(e).data.isDirectory();
    return t instanceof Function && t(o), o;
  } catch (e) {
    alert("isDir() - error: " + e);
  }
}
function readDir(e, t) {
  try {
    if (t instanceof Function) return fs.readdirSync(e);
    fs.readdir(e, t);
  } catch (e) {
    alert("readDir() - error: " + e);
  }
}
function makeDir(e, t) {
  try {
    cep.fs.makedir(e), t instanceof Function && t(e);
  } catch (e) {
    alert("makeDir() - error:" + e);
  }
}
function removeDir(e, t) {
  try {
    fs.rmdir(
      e,
      t instanceof Function
        ? t
        : function (e) {
            e && alert("removeDir() => (err): " + e);
          }
    );
  } catch (e) {
    alert("removeDir() - error: " + e);
  }
}
function chooseFolder(e, t, o) {
  try {
    var r = cep.fs.showOpenDialog(
      !1,
      !0,
      t || "Choose folder..",
      e || "~/Desktop"
    ).data;
    return o instanceof Function && o(r), r;
  } catch (e) {
    alert("chooseFolder() - error: " + e);
  }
}
function duplicateDir(e, t, o, r) {
  try {
    (e = PATH.normalize(e)), (t = PATH.normalize(t));
    var s = fsx.listFilesSync(e),
      n = fsx.listDirsSync(e);
    fs.existsSync(t) || fs.mkdirSync(t);
    for (var a = s.length; a--; )
      (o instanceof Function && !o(PATH.join(t, s[a]))) ||
        (fs.existsSync(PATH.join(t, s[a])) && !r) ||
        saveFile(PATH.join(t, s[a]), readFile(PATH.join(e, s[a])));
    for (var c = n.length; c--; )
      duplicateDir(PATH.join(e, n[c]), PATH.join(t, n[c]));
  } catch (e) {
    alert("duplicateDir() - error" + e);
  }
}
function Rename(e, t) {
  try {
    cep.fs.rename(e, t);
  } catch (e) {
    alert("rename() - error: " + e);
  }
}
function execute(e, t, o, r) {
  try {
    (t = t || "explorer"),
      cp.spawn(t, [PATH.normalize(e)]),
      r instanceof Function &&
        r({
          path: PATH.normalize(e),
          program: t,
          platform: platform,
          message: o,
        }),
      $console && o && $console.log(o);
  } catch (e) {
    alert("execute() - error: " + e);
  }
}
function isConnect(t) {
  try {
    dns.resolve("www.google.com", function (e) {
      t(!e);
    });
  } catch (e) {
    alert("isConnect() - error: " + e);
  }
}
function openURL(e, t) {
  try {
    if ((cep.util.openURLInDefaultBrowser(e), t instanceof Function))
      return t(e);
  } catch (e) {
    alert("openURL() - error: " + e);
  }
}
function download(t, o, r) {
  try {
    if (
      appVersionIsNormal &&
      isAppOnline &&
      (PATH || (PATH = require("path")),
      (o = PATH.normalize(o)),
      fs.existsSync(o))
    ) {
      var s = PATH.normalize(o + PATH.sep + PATH.basename(t));
      fs.existsSync(s) && fsx.deleteFileSync(s);
      var n = fs.createWriteStream(s);
      http
        .get(t, function (e) {
          e.pipe(n),
            e.on("end", function () {
              r instanceof Function &&
                r({
                  url: t,
                  unload: o,
                  filename: PATH.basename(t),
                  file: n,
                  path: s,
                });
            });
        })
        .end();
    }
  } catch (e) {
    alert("download() - error: " + e);
  }
}
function extractZip(e, t, o, r) {
  try {
    if (
      ((e = PATH.normalize(e)),
      (t = PATH.normalize(t)),
      appVersionIsNormal && fs.existsSync(e) && fs.existsSync(t))
    ) {
      var s = new admZip(e);
      return (
        s.extractAllTo(t, o || !0),
        r instanceof Function
          ? r({ zip: s, path: e, unload: t, overwrite: o })
          : r
      );
    }
  } catch (e) {
    alert("extractZip() - error: " + e);
  }
}
function jsonStringify(e, t, o) {
  var r = (t = t || ["{", "}"])[0],
    s = "";
  for (var n in e)
    e[n] instanceof Object && "object" == typeof e[n]
      ? e[n] instanceof Array
        ? (r += s + '"' + n + '":' + jsonStringify(e[n], ["[", "]"], "array"))
        : (r += s + '"' + n + '":' + jsonStringify(e[n], null, "object"))
      : e[n] instanceof Function ||
        (r +=
          "array" === o
            ? s + '"' + e[n] + '"'
            : s + '"' + n + '":"' + e[n] + '"'),
      (s = ",");
  return r + t[1];
}
function comparingArrays(e, t) {
  try {
    var o = 0;
    if (e.length !== t.length) return !1;
    for (var r = 0; r < t.length; r++) e[r] === t[r] && o++;
    return o === e.length;
  } catch (e) {
    alert("comparingArrays() - error: " + e);
  }
}
function clearCloneWithArray(e) {
  try {
    for (var t = e.length, o = 0; o < t; o++)
      for (var r = o + 1; r < t; r++)
        e[o] === e[r] && (e.splice(r, 1), o--, (t = e.length));
    return e;
  } catch (e) {
    alert("clearCloneWithArray() - error: " + e);
  }
}
function removeItemsWithArray(e, o) {
  try {
    for (var t = [], r = 0; r < e.length; r++) s(e[r]) || t.push(e[r]);
    function s(e) {
      for (var t = 0; t < o.length; t++) if (e === o[t]) return !0;
      return !1;
    }
    return t;
  } catch (e) {
    alert("removeItemsWithArray() - error: " + e);
  }
}
function indexFromArray(e, t) {
  try {
    if (e && t) for (var o = e.length; o--; ) if (t === e[o]) return o;
    return -1;
  } catch (e) {
    alert("indexFromArray() - error: " + e);
  }
}
function checkOnExistsItemInArray(e, t) {
  try {
    for (var o = e.length; o--; ) if (e[o] === t) return !0;
    return !1;
  } catch (e) {
    alert("checkOnExistsItemInArray() - error: " + e);
  }
}
function removeItemWithArray(e, t) {
  try {
    for (var o = e.length; o--; ) if (e[o] === t) return e.splice(o, 1), e;
    return e;
  } catch (e) {
    alert("removeItemWithArray() - error: " + e);
  }
}
function checkTextInString(e, t) {
  try {
    return a.replace(b, "") !== a;
  } catch (e) {
    alert("checkTextInString() - error: " + e);
  }
}
function replaceText(e, t, o) {
  try {
    if ("string" != typeof e && !(e instanceof Array)) return !1;
    if (!t) return e;
    "string" == typeof t && (t = [t]);
    for (var r = t.length; r--; ) e = e.replace(new RegExp(t[r], "g"), o);
    return e;
  } catch (e) {
    alert("replaceText() - error: " + e);
  }
}
function removeChars(e, t) {
  try {
    return replaceText(e, t.split(""), "");
  } catch (e) {
    alert("removeChars() - error: " + e);
  }
}
function stringReverse(e) {
  try {
    for (var t = "", o = e.length; o--; ) t += e[o];
    return t;
  } catch (e) {
    alert("stringReverse() - error: " + e);
  }
}
function getUnits(e, t) {
  try {
    return -1 < "px,pt,mm,cm,in,pc".indexOf(e.slice(-2))
      ? e.slice(-2)
      : t || !1;
  } catch (e) {
    $console.systemLog.write("pattern.js => get units", e);
  }
}
(String.prototype.gsep = function (e) {
  return this.replace(/\\/g, e || "/");
}),
  (String.prototype.htmlEnt = function () {
    return this.replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }),
  (String.prototype.toHTML = function () {
    return new DOMParser().parseFromString(this, "text/xml");
  });
var fs = require("fs"),
  dns = require("dns"),
  PATH = require("path"),
  fsx = require("fs-extended"),
  cp = require("child_process"),
  buf = require("buffer").Buffer,
  keycode = require("keycode"),
  lustra = new CSInterface(),
  app = {},
  hostEnvironment = (window.lustra = lustra).getHostEnvironment(),
  appID = hostEnvironment.appId,
  extID = lustra.getExtensionID(),
  appName = hostEnvironment.appName,
  appVersion = hostEnvironment.appVersion,
  isAppOnline = hostEnvironment.isAppOnline,
  APIVersion = lustra.getCurrentApiVersion().major,
  OSName = lustra.getOSInformation().indexOf("win") ? "Windows" : "Mac OS",
  appVersionIsNormal =
    "PHXS" === appName || "PHSP" === appName
      ? 17 < parseInt(appVersion)
      : "IDSN" === appName
      ? 11 < parseInt(appVersion)
      : 19 < parseInt(appVersion),
  http = appVersionIsNormal ? require("http") : void 0,
  admZip = appVersionIsNormal ? require("adm-zip") : void 0,
  easyZip = appVersionIsNormal ? require("easy-zip").EasyZip : void 0,
  $path = {
    host: PATH.normalize(lustra.getSystemPath(SystemPath.HOST_APPLICATION)),
    myDocs: PATH.normalize(lustra.getSystemPath(SystemPath.MY_DOCUMENTS)),
    userData: PATH.normalize(lustra.getSystemPath(SystemPath.USER_DATA)),
    extension: PATH.normalize(lustra.getSystemPath(SystemPath.EXTENSION)),
    commonFiles: PATH.normalize(lustra.getSystemPath(SystemPath.COMMON_FILES)),
    application: PATH.normalize(lustra.getSystemPath(SystemPath.APPLICATION)),
    project: {},
  };
($path.extScripts = $path.extension + PATH.sep + "scripts" + PATH.sep),
  ($path.extSettings = $path.extension + PATH.sep + "settings" + PATH.sep),
  ($path.extTemp = $path.extension + PATH.sep + "temp" + PATH.sep),
  ($path.project.main = $path.myDocs + PATH.sep + "LA Extensions"),
  ($path.project.ext = $path.project.main + PATH.sep + extID),
  ($path.project.ILST = $path.project.ext + PATH.sep + "Illustrator"),
  ($path.project.PHXS = $path.project.ext + PATH.sep + "Photoshop"),
  ($path.project.PHSP = $path.project.ext + PATH.sep + "Photoshop"),
  ($path.project.IDSN = $path.project.ext + PATH.sep + "InDesign"),
  ($path.project.app = $path.project[appName]),
  ($path.project.logPath = $path.project.app + PATH.sep + "log.txt"),
  ($path.project.myScripts = $path.project.app + PATH.sep + "My Scripts"),
  ($path.project.messages = $path.extension + PATH.sep + "messages"),
  ($path.project.systemLogPath = $path.extension + PATH.sep + "systemLog.txt");
var cacheFolder = {
  win: "C:/Users/%USERNAME%/AppData/Local/Temp/cep_cache/",
  mac: "~/Library/Logs/CSXS/cep_cache/",
};
(window.jQuery = require(PATH.normalize(
  $path.extension + "/assets/js/jquery 2.1.1.js"
).gsep())),
  (window.$ = window.jQuery);
var jQuery = window.jQuery;
function getFullAppName(e) {
  switch ((e = e || appName)) {
    case "ILST":
      return "Illustrator";
    case "PHXS":
    case "PHSP":
      return "Photoshop";
    case "IDSN":
      return "InDesign";
  }
  return appName;
}
var $console,
  appFullName = getFullAppName().toLowerCase();
function setEventsCloseAllExtension() {
  try {
    lustra.addEventListener(extID + ".closeExtension", function (e) {
      lustra.closeExtension();
    });
  } catch (e) {
    $console.systemLog.write("update.js => setEventsCloseAllExtension()", e);
  }
}
function closeAllExtension(e) {
  try {
    for (var t = e.length; t--; ) {
      var o = new CSEvent(e[t] + ".closeExtension", "GLOBAL", appID, e[t]);
      lustra.dispatchEvent(o);
    }
  } catch (e) {
    $console.systemLog.write("update.js => closeAllExtension()", e);
  }
}
function updateExtension(o, r, s, n) {
  try {
    (counter = 0), (maxCounter = 0);
    var e = { success: !1, error: !1, noInternetConnection: !1 };
    n ? $.extend(e, n) : (n = e),
      dns.resolve("www.google.com", function (e) {
        e
          ? ($console.log("No internet connection!"),
            n.error instanceof Function && n.error())
          : $.ajax({
              url: "http://www.extensions.ladygin.pro/adobe_extensions_update.json",
              dataType: "json",
              success: function (e) {
                try {
                  if ((e = e[o])) {
                    e.versions.length;
                    var t = checkNewVersion(
                      parseInt(extVersion.replace(/\./g, "")),
                      e.versions,
                      s
                    );
                    "boolean" != typeof t
                      ? e.version[t] &&
                        (appVersionIsNormal
                          ? confirm(
                              'A new version of the extension "' +
                                extID +
                                '"! Update?'
                            ) &&
                            download(
                              e.version[t].downloadLink,
                              $path.project.ext,
                              function (t) {
                                try {
                                  extractZip(
                                    t.path,
                                    $path.extension,
                                    !0,
                                    function (e) {
                                      fsx.deleteFileSync(t.path),
                                        alert(
                                          "Please reload extension or reload application!"
                                        ),
                                        closeAllExtension(extList || [extID]);
                                    }
                                  );
                                } catch (e) {
                                  $console.systemLog.write(
                                    "update.js => Update() => ajax.success => download()",
                                    e
                                  );
                                }
                              }
                            )
                          : $console.log(
                              'A new version of the extension "' +
                                extID +
                                '" is available <a href="' +
                                e.version[t].downloadLink +
                                '" class="open-in-browser button -success button_full-width button_center">Download new version</a>'
                            ))
                      : setting.loaded &&
                        !r &&
                        (s
                          ? $console.log(
                              "Do you have the <u>oldest</u> version of the extension!",
                              !1,
                              !0
                            )
                          : $console.log(
                              "Do you have the <u>latest</u> version of the extension!",
                              !1,
                              !0
                            )),
                      n.success instanceof Function && n.success(t);
                  } else
                    $console.log(
                      "Do you have the <u>latest</u> version of the extension!",
                      !1,
                      !0
                    ),
                      n.success instanceof Function && n.success(e);
                } catch (e) {
                  $console.systemLog.write(
                    "update.js => Update() => ajax.success",
                    e
                  );
                }
              },
              error: function (e, t) {
                var o = "";
                (o =
                  0 === e.status
                    ? "Not connect to server!\n Verify Network."
                    : 404 == e.status
                    ? "Requested page not found. [404]"
                    : 500 == e.status
                    ? "Internal Server Error [500]."
                    : "parsererror" === t
                    ? "Requested JSON parse failed."
                    : "timeout" === t
                    ? "Time out error."
                    : "abort" === t
                    ? "Ajax request aborted."
                    : "Uncaught Error.\n" + e.responseText),
                  $console.systemLog.write(o),
                  $console.log(o),
                  n.error instanceof Function && n.error();
              },
            });
      });
  } catch (e) {
    $console.systemLog.write("update.js => Update()", e);
  }
}
function checkNewVersion(e, t, o) {
  for (var r = (t = t || []).length, s = 0; s < r; s++)
    if (e === parseInt(t[s].replace(/\./g, "")))
      return o ? -1 < s - 1 && t[s - 1] : s + 1 !== r && t[s + 1];
  return !1;
}
(($console = {
  logSize: 1e6,
  toLogFile: !0,
  firstStart: !0,
  systemLogPath: "",
  node: $(".console"),
  textNode: $(".console .message"),
  button: $(".console .button-expand-roll-up"),
  extVersion: "developer",
  program: {
    editor: "",
    explorer: "",
    fileTypes: {
      js: "",
      jsx: "",
      html: "",
      tpl: "",
      php: "",
      txt: "",
      pdf: "",
      ai: "",
      psd: "",
      indd: "",
    },
  },
  log: function (e, t, o) {
    try {
      return (
        $console.textNode.length &&
          "hidden" !== t &&
          (t ? $console.textNode.text(e) : $console.textNode.empty().append(e)),
        e &&
          $console.toLogFile &&
          !o &&
          saveFile(
            $path.project.logPath,
            readFile($path.project.logPath) +
              $console.format.message(e, appName)
          ),
        $console
      );
    } catch (e) {
      $console.systemLog.write("$console => log()", e);
    }
  },
  systemLog: {
    write: function (e, t) {
      try {
        var o = readFile($path.project.systemLogPath);
        return (
          t
            ? ($console.log("System error: " + t),
              (o =
                $console.format.message(
                  e + " - error: " + t + "\r\n" + t.stack,
                  appName
                ) + o))
            : (o = $console.format.message(e, appName) + o),
          saveFile($path.project.systemLogPath, o),
          $console
        );
      } catch (e) {
        alert("$console => systemLog => write() - error: " + e);
      }
    },
    read: function () {
      try {
        return readFile($path.project.systemLogPath);
      } catch (e) {
        alert("$console => systemLog => read() - error: " + e);
      }
    },
    open: function () {
      try {
        return $console.open.systemLog(), $console;
      } catch (e) {
        alert("$console => systemLog => open() - error: " + e);
      }
    },
  },
  open: {
    file: function (e, t) {
      try {
        return execute(e, t || $console.program.editor || ""), $console;
      } catch (e) {
        $console.systemLog.write("$console.open => file()", e);
      }
    },
    dir: function (e, t) {
      try {
        return execute(e, t || $console.program.explorer || ""), $console;
      } catch (e) {
        $console.systemLog.write("$console.open => dir()", e);
      }
    },
    log: function () {
      try {
        return $console.open.file($path.project.logPath), $console;
      } catch (e) {
        $console.systemLog.write("$console.open => log()", e);
      }
    },
    systemLog: function () {
      try {
        return $console.open.file($path.project.systemLogPath), $console;
      } catch (e) {
        $console.systemLog.write("$console.open => systemLog()", e);
      }
    },
    extDir: function () {
      try {
        return $console.open.dir($path.project.ext), $console;
      } catch (e) {
        $console.systemLog.write("$console.open => extDir()", e);
      }
    },
    appDir: function () {
      try {
        return $console.open.dir($path.project.app), $console;
      } catch (e) {
        $console.systemLog.write("$console.open => appDir()", e);
      }
    },
    sourceDir: function () {
      try {
        return $console.open.dir($path.extension), $console;
      } catch (e) {
        $console.systemLog.write("$console.open => sourceDir()", e);
      }
    },
    LADir: function () {
      try {
        return $console.open.dir($path.project.main), $console;
      } catch (e) {
        $console.systemLog.write("$console.open => LADir()", e);
      }
    },
  },
  clear: {
    htmlDefalut: function () {
      try {
        return $console.textNode.text("console"), $console;
      } catch (e) {
        $console.systemLog.write("$console.clear => htmlDefalut()", e);
      }
    },
    html: function () {
      try {
        return $console.textNode.text(""), $console;
      } catch (e) {
        $console.systemLog.write("$console.clear => html()", e);
      }
    },
    log: function () {
      try {
        return saveFile($path.project.logPath, ""), $console;
      } catch (e) {
        $console.systemLog.write("$console.clear => log()", e);
      }
    },
    systemLog: function () {
      try {
        return saveFile($path.project.systemLogPath, ""), $console;
      } catch (e) {
        $console.systemLog.write("$console.clear => systemLog()", e);
      }
    },
    limitEvent: function (e, o, r) {
      try {
        e && fs.existsSync(e)
          ? fs.stat(e, function (e, t) {
              e
                ? $console.systemLog.write(
                    "$console => clear => limitEvent()",
                    e
                  )
                : (r || t.size >= $console.logSize) && $console.clear[o]();
            })
          : ($console.clear.limitEvent($path.project.logPath, "log"),
            $console.clear.limitEvent(
              $path.project.systemLogPath,
              "systemLog"
            ));
      } catch (e) {
        $console.systemLog.write("$console.clear => limitEvent()", e);
      }
    },
  },
  get: {
    value: function () {
      return $console.textNode.text();
    },
  },
  appendTo: {
    html: function (e, t) {
      try {
        return (
          "string" != typeof t && (t = "<br>"),
          $console.textNode.text().length || (t = ""),
          $console.textNode.append(t + e),
          $console
        );
      } catch (e) {
        $console.systemLog.write("$console.appendTo => html()", e);
      }
    },
    log: function (e) {
      try {
        var t = readFile($path.project.logPath);
        return (
          (t += "[ append ] " + $console.format.message(e)),
          saveFile($path.project.logPath, t),
          $console
        );
      } catch (e) {
        $console.systemLog.write("$console.appendTo => log()", e);
      }
    },
    systemLog: function (e) {
      try {
        var t = readFile($path.project.systemLogPath);
        return (
          (t += "[ append ] " + $console.format.message(e, appName)),
          saveFile($path.project.systemLogPath, t),
          $console
        );
      } catch (e) {
        $console.systemLog.write("$console.appendTo => systemLog()", e);
      }
    },
  },
  format: {
    message: function (e, t) {
      try {
        return (
          (t = t ? " [ " + getFullAppName(t) + " ]" : ""),
          (e = e ? e.toString() : ""),
          "[ " +
            $console.format.date() +
            " - " +
            $console.format.time() +
            " ] [ " +
            extID +
            " ] [ version: " +
            $console.extVersion +
            " ] [ OS: " +
            OSName +
            " ] [ API: " +
            APIVersion +
            " ]" +
            t +
            "\r\n" +
            e.replace(/&nbsp;/g, " ").replace(/<br>/g, "\r\n") +
            "\r\n\r\n\r\n"
        );
      } catch (e) {
        $console.systemLog.write("$console.format => message()", e);
      }
    },
    time: function (e) {
      try {
        var t = e || new Date();
        return t.getHours() + ":" + t.getMinutes() + ":" + t.getSeconds();
      } catch (e) {
        $console.systemLog.write("$console.format => time()", e);
      }
    },
    date: function (e, t) {
      try {
        for (var o = arguments.length; o--; )
          arguments[o] instanceof Date && (t = arguments[o]),
            "string" == typeof arguments[o] && (e = arguments[o]);
        for (
          var r = t || new Date(),
            s = e || "dd,mm,yy",
            n = "",
            a = {
              d: r.getDate(),
              m: r.getMonth() + 1,
              dd: ("0" + r.getDate()).slice(-2),
              mm: ("0" + (r.getMonth() + 1)).slice(-2),
              yy: r.getFullYear().toString().slice(2),
              yyyy: r.getFullYear().toString(),
            },
            c = s.split(",").reverse(),
            l = c.length,
            i = ".";
          l--;

        )
          l || (i = ""), (n += a[c[l]] + i);
        return n;
      } catch (e) {
        $console.systemLog.write("$console.format => date()", e);
      }
    },
  },
}).expandMax = function () {
  try {
    return (
      $console.button.addClass("active"),
      $console.node
        .addClass("console_expand_max")
        .css({
          height: window.innerHeight - $(".setting-button").height() + "px",
        }),
      $console
    );
  } catch (e) {
    $console.systemLog.write("$console.expandHeight()", e);
  }
}),
  ($console.expand = function (e) {
    try {
      return (
        $console.node.addClass("console_expand"),
        e instanceof Function && e(!0),
        $console
      );
    } catch (e) {
      $console.systemLog.write("$console.expandHeight()", e);
    }
  }),
  ($console.unExpand = function (e) {
    try {
      return (
        $console.node.removeClass("console_expand"),
        e instanceof Function && e(!1),
        $console
      );
    } catch (e) {
      $console.systemLog.write("$console.expandHeight()", e);
    }
  }),
  window.addEventListener("resize", function (e) {
    try {
      $console.node.hasClass("console_expand_max") &&
        $console.node.css({
          height: window.innerHeight - $(".setting-button").height() + "px",
        });
    } catch (e) {
      $console.systemLog.write('$console => window event "resize"', e);
    }
  }),
  ($console.rollUp = function () {
    try {
      $console.button.removeClass("active"),
        $console.node.removeClass("console_expand_max").css({ height: "" });
    } catch (e) {
      $console.systemLog.write("$console.rollUp()", e);
    }
  }),
  ($console.collapse = function (e) {
    try {
      return (
        $console.node.addClass("console_collapse"),
        e instanceof Function && e(!0),
        $console
      );
    } catch (e) {
      $console.systemLog.write("$console.collapse()", e);
    }
  }),
  ($console.unCollapse = function (e) {
    try {
      return (
        $console.node.removeClass("console_collapse"),
        e instanceof Function && e(!1),
        $console
      );
    } catch (e) {
      $console.systemLog.write("$console.unCollapse()", e);
    }
  }),
  $console.node.on("click", ".button-expand-roll-up", function (e) {
    try {
      $(this).hasClass("active") ? $console.rollUp() : $console.expandMax();
    } catch (e) {
      $console.systemLog.write(
        '$console.node => .button-expand-roll-up => "event click"',
        e
      );
    }
  }),
  setEventsCloseAllExtension();
var appSkin = {
  items: [],
  add: function (e) {
    try {
      return (
        e &&
          (e instanceof Array || "string" == typeof e) &&
          appSkin.items.push(e),
        appSkin
      );
    } catch (e) {
      $console.systemLog.write("UX.js => appSkin.add()", e);
    }
  },
  update: function (e, t) {
    try {
      return (
        e instanceof Function && ((t = e), (e = void 0)),
        appSkin.add(e),
        updateSkin(t),
        appSkin
      );
    } catch (e) {
      $console.systemLog.write("UX.js => appSkin.add()", e);
    }
  },
};
function updateSkin(t) {
  try {
    function o(e, t) {
      try {
        var o,
          r = e.panelBackgroundColor.color,
          s = rgbToHex(r);
        $(appSkin.items.toString()).css({ "background-color": s }),
          (o =
            203 < Math.round(r.red)
              ? "theme__light"
              : 100 < Math.round(r.red)
              ? "theme__light-medium"
              : 65 < Math.round(r.red) && Math.round(r.red) < 100
              ? "theme__dark-medium"
              : "theme__dark"),
          $("body")
            .removeClass("theme__dark")
            .removeClass("theme__dark-medium")
            .removeClass("theme__light-medium")
            .removeClass("theme__light")
            .addClass(o),
          t instanceof Function &&
            t({ theme: o, color: r, hexColor: s, appSkinInfo: e });
      } catch (e) {
        $console.systemLog.write(
          "LAUX => updateSkin() => updateThemeWithAppSkinInfo()",
          e
        );
      }
    }
    o(JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo, t),
      lustra.addEventListener(
        CSInterface.THEME_COLOR_CHANGED_EVENT,
        function (e) {
          try {
            o(
              JSON.parse(window.__adobe_cep__.getHostEnvironment()).appSkinInfo,
              t
            );
          } catch (e) {
            $console.systemLog.write(
              "LAUX => updateSkin() => onAppThemeColorChanged()",
              e
            );
          }
        }
      );
  } catch (e) {
    $console.systemLog.write("LAUX => updateSkin()", e);
  }
}
function rgbToHex(e) {
  try {
    return (
      "#" +
      t(Math.round(e.red)) +
      t(Math.round(e.green)) +
      t(Math.round(e.blue))
    );
    function t(e) {
      var t = e.toString(16);
      try {
        return 1 === t.length ? "0" + t : t;
      } catch (e) {
        $console.systemLog.write("LAUX => rgbToHex() => to()", e);
      }
    }
  } catch (e) {
    $console.systemLog.write("LAUX => rgbToHex()", e);
  }
}
function photoshopPersistent(e) {
  try {
    lustra.dispatchEvent(
      new CSEvent(
        "com.adobe.Photoshop" + (e ? "" : "Un") + "Persistent",
        "APPLICATION",
        appID,
        extID
      )
    );
  } catch (e) {
    $console.systemLog.write("photoshopPersistent()", e);
  }
}
function createSystemLog() {
  try {
    fs.existsSync($path.project.systemLogPath) ||
      saveFile($path.project.systemLogPath, "");
  } catch (e) {
    alert("LAUX => createSystemLog() - error: " + e);
  }
}
function createWorkDirectory(e) {
  try {
    var t = $.extend(
      !0,
      { logFile: !0, myScripts: !0, systemLog: !0, appDirectory: !0 },
      e || {}
    );
    t.systemLog && createSystemLog(),
      fs.existsSync($path.project.main)
        ? (fs.existsSync($path.project.ext) || makeDir($path.project.ext),
          t.appDirectory && createAppDirectory(t))
        : (makeDir($path.project.main), createWorkDirectory(t));
  } catch (e) {
    $console.systemLog.write("LAUX => createWorkDirectory()", e);
  }
}
function createAppDirectory(e) {
  try {
    (e = e || {}),
      fs.existsSync($path.project.app)
        ? (e.myScripts &&
            !fs.existsSync($path.project.myScripts) &&
            makeDir($path.project.myScripts),
          e.logFile &&
            !fs.existsSync($path.project.logPath) &&
            saveFile($path.project.logPath, ""))
        : (makeDir($path.project.app), createAppDirectory(e));
  } catch (e) {
    $console.systemLog.write("LAUX => createAppDirectory()", e);
  }
}
var LAUX = {
  extension: {
    attribute: { focus: "data-extension-is-focus" },
    show: function (e, t) {
      return (
        document.body.classList.toggle(t || "fade", "boolean" == typeof e && e),
        LAUX.extension.redraw()
      );
    },
    redraw: function () {
      var e = document.createEvent("UIEvents");
      return (
        e.initUIEvent("resize", !0, !1, window, 0),
        window.dispatchEvent(e),
        appSkin.update(),
        LAUX.extension
      );
    },
    clearCache: function (t, o, e, r) {
      try {
        (t = t || navigator.platform.toLowerCase().slice(0, 3)),
          (e = e || hostEnvironment.appVersion),
          (o = o || extID),
          (r = r || appID),
          fsx.deleteDirSync(
            PATH.normalize(cacheFolder[t] + PATH.sep + r + "_" + e + "_" + o)
          );
      } catch (e) {
        $console.systemLog.write(
          "UX.js => LAUX.extension.clearCache(os: " +
            t +
            ", extension_name: " +
            o +
            ")",
          e
        );
      }
    },
  },
  radio: {
    selector: ".radio-button",
    attribute: "data-checked",
    set: function (e) {
      try {
        LAUX.radio.callbacks.run("beforeActivate", { item: e }),
          e
            .parent()
            .find("> " + LAUX.radio.selector)
            .attr(LAUX.radio.attribute, !1),
          e.attr(LAUX.radio.attribute, !0),
          LAUX.radio.callbacks.run("afterActivate", { item: e });
      } catch (e) {
        $console.systemLog.write("UX.js => LAUX.radio.set()", e);
      }
    },
    getActive: function (e) {
      try {
        return e.find(
          " > " + LAUX.radio.selector + "[" + LAUX.radio.attribute + '="true"]'
        );
      } catch (e) {
        $console.systemLog.write("UX.js => LAUX.radio.getActive()", e);
      }
    },
  },
  checkbox: {
    selector: ".checkbox",
    attribute: "data-checked",
    set: function (e, t) {
      try {
        LAUX.checkbox.callbacks.run("beforeActivate", { item: e, value: t }),
          e.attr(LAUX.checkbox.attribute, t),
          LAUX.checkbox.callbacks.run("afterActivate", { item: e, value: t });
      } catch (e) {
        $console.systemLog.write("UX.js => LAUX.checkbox.set()", e);
      }
    },
    get: function (e) {
      try {
        return JSON.parse(e.attr(LAUX.checkbox.attribute));
      } catch (e) {
        $console.systemLog.write("UX.js => LAUX.checkbox.get()", e);
      }
    },
    toggle: function (e) {
      try {
        LAUX.checkbox.set(e, !LAUX.checkbox.get(e));
      } catch (e) {
        $console.systemLog.write("UX.js => LAUX.checkbox.toggle()", e);
      }
    },
  },
  modal: {
    selector: { container: ".modal", closeButton: ".modal__close-button" },
    state: { opened: ".opened" },
    open: function (e, t) {
      try {
        return (
          (e = "string" == typeof e ? $(e) : e),
          LAUX.modal.callbacks.run("beforeOpen", { $modal: e, close: t }),
          e[(t ? "remove" : "add") + "Class"](LAUX.modal.state.opened.slice(1)),
          LAUX.modal.callbacks.run("afterOpen", { $modal: e, close: t }),
          e
        );
      } catch (e) {
        $console.systemLog.write(
          "UX.js => LAUX.modal.open()" + (t ? " => close" : ""),
          e
        );
      }
    },
    close: function (e) {
      try {
        return LAUX.modal.open(e, !0);
      } catch (e) {
        $console.systemLog.write("UX.js => LAUX.modal.close()", e);
      }
    },
  },
  dropdown: {
    tag: {
      container: "UL",
      subContainer: "UL",
      item: "LI",
      selectedItem: "LI",
      removeButton: "I",
      removableButton: "B",
    },
    selector: {
      container: ".dropdown",
      subContainer: ".dropdown__sub",
      item: ".dropdown__item",
      selectedItem: ".dropdown__item.selected",
      selected: ".selected",
      removeButton: ".-remove-items__button-remove",
      removableButton: ".-removable__button",
    },
    state: {
      active: ".opened",
      disabled: ".disabled",
      notSelect: ".-not-select",
      removeItem: ".-remove-items",
      removable: ".-removable",
      dontOpen: !1,
    },
    attribute: {
      index: "data-index",
      value: "data-value",
      titleItem: "data-title",
      titleItems: "data-title-items",
    },
    getItems: function (e) {
      try {
        return e.find(
          LAUX.dropdown.selector.subContainer +
            " > " +
            LAUX.dropdown.selector.item
        );
      } catch (e) {
        $console.systemLog.write("UX.js => LAUX.dropdown.getItems()", e);
      }
    },
  },
  input: {
    clickEdit: {
      selector: { node: ".input-click-edit", active: ".focused" },
      cursorPosition: "first",
    },
    tabindex: !1,
  },
  folder: {
    tag: {
      folder: "UL",
      item: "LI",
      info: "DIV",
      explorer: "I",
      toggle: "DIV",
      text: "SPAN",
      trash: "B",
    },
    selector: {
      trash: ".trash",
      active: ".opened",
      disabled: ".disabled",
      empty: ".empty",
      folder: ".folder",
      highlight: ".highlight",
      item: ".folder__item",
      info: ".folder__info",
      toggle: ".folder__toggle",
      wrapper: ".folder-wrapper",
      subFolder: ".folder__sub-folder",
      explorer: {
        pathAttr: "title",
        folder: ".folder__explorer",
        item: ".folder__item__explorer",
      },
      view: "data-view",
      fileType: "data-type",
    },
    view: "tree",
    emptyView: { value: "show", show: ".show", hide: ".hide" },
    event: { removeByKeydown: !1 },
    DnD: {
      enabled: !0,
      selector: { active: ".dnd-activate" },
      dropBreak: !1,
      nodes: [],
    },
    highlight: { clearException: [] },
  },
  button: {
    execute: {
      tag: "SPAN",
      specialClass: ".button",
      selector: ".execute",
      path: "data-path",
      program: "data-program",
      open: function (e) {
        try {
          var t = LAUX.button.execute,
            o = e.attr(t.path),
            r = e.attr(t.program);
          o && o.length && execute(PATH.normalize(o), r.length ? r : "");
        } catch (e) {
          $console.systemLog.write("LAUX.button.open()", e);
        }
      },
      getHTMLString: function (e, t, o) {
        try {
          var r = LAUX.button.execute,
            s = r.tag.toLowerCase();
          return (
            "<" +
            s +
            ' class="' +
            r.selector.slice(1) +
            " " +
            r.specialClass.slice(1) +
            '" ' +
            r.path +
            '="' +
            e +
            '" ' +
            r.program +
            '="' +
            (t || "") +
            '">' +
            (o || "Execute button") +
            "</" +
            s +
            ">"
          );
        } catch (e) {
          $console.systemLog.write("LAUX.button.open()", e);
        }
      },
    },
    browser: { selector: ".open-in-browser" },
  },
  setting: {
    tag: { logo: "I" },
    selector: {
      active: ".active",
      button: ".setting-button",
      wrapper: ".setting-wrapper",
    },
  },
  loader: {
    selector: { node: ".loader", active: ".loader_show" },
    show: function (e) {
      try {
        (e = e || $(LAUX.loader.selector.node)).addClass(
          LAUX.loader.selector.active.slice(1)
        );
      } catch (e) {
        $console.systemLog.write("LAUX.loader.show()", e);
      }
    },
    hide: function (e) {
      try {
        (e = e || $(LAUX.loader.selector.node)).removeClass(
          LAUX.loader.selector.active.slice(1)
        );
      } catch (e) {
        $console.systemLog.write("LAUX.loader.hide()", e);
      }
    },
  },
};
function dropdownRemoveItemHandler(e, t) {
  try {
    var o = e.parents(LAUX.dropdown.selector.container),
      r =
        (o.find(LAUX.dropdown.selector.selectedItem),
        LAUX.dropdown.getItems(o)),
      s = {
        container: parseInt(o.attr(LAUX.dropdown.attribute.index)),
        item: e.parent().index(),
      };
    s.container === s.item && (s.item = 0),
      LAUX.dropdown.callbacks.run("beforeRemoveItem", o),
      e.parent().remove(),
      r.length
        ? LAUX.dropdown.setActiveItem(o, s.item)
        : LAUX.dropdown.empty(o),
      LAUX.dropdown.callbacks.run("afterRemoveItem", o);
  } catch (e) {
    $console.systemLog.write(
      'LAUX => dropdownRemoveItemHandler() => "click" event',
      e
    );
  }
}
function highlightFolderAndItemsHandler(e, t, o, r) {
  try {
    var s = !1,
      n = LAUX.folder.selector.highlight.slice(1);
    if (
      t.hasClass(LAUX.folder.selector.item.slice(1)) ||
      t.hasClass(LAUX.folder.selector.folder.slice(1)) ||
      t.hasClass(LAUX.folder.selector.subFolder.slice(1))
    )
      s = !0;
    else if (
      (e.target instanceof HTMLElement &&
        e.target.tagName === LAUX.folder.tag.text &&
        t.parent().hasClass(LAUX.folder.selector.item.slice(1))) ||
      t.hasClass(LAUX.folder.selector.info.slice(1))
    )
      (s = !0), (t = t.parent());
    else if (
      e.target instanceof HTMLElement &&
      e.target.tagName === LAUX.folder.tag.text &&
      t.parent().hasClass(LAUX.folder.selector.info.slice(1))
    )
      (s = !0), (t = t.parent().parent());
    else if (
      !t.hasClass(LAUX.folder.selector.toggle.slice(1)) &&
      !t.hasClass(LAUX.folder.selector.explorer.folder.slice(1)) &&
      !t.hasClass(LAUX.folder.selector.explorer.item.slice(1))
    ) {
      if (
        (LAUX.folder.callbacks.run("beforeActiveHighlight", {
          item: t,
          event: e,
          class: n,
          action: o,
          key: r,
        }),
        (function (e) {
          try {
            for (
              var t = LAUX.folder.highlight.clearException, o = t.length;
              o--;

            )
              if (e.hasClass(t[o])) return !0;
            return !1;
          } catch (e) {
            $console.systemLog.write(
              "LAUX => checkOnStoppedClearHighlight()",
              e
            );
          }
        })(t))
      )
        return !1;
      d(LAUX.folder.selector.highlight.slice(1)),
        LAUX.folder.callbacks.run("beforeActiveHighlight", {
          item: t,
          ev: e,
          class: n,
          action: o,
          key: r,
        });
    }
    if (s) {
      if (
        (LAUX.folder.callbacks.run("beforeActiveHighlight", {
          item: t,
          ev: e,
          class: n,
          action: o,
          key: r,
        }),
        "add" !== o || t.hasClass(n))
      )
        if ("remove" === o) t.removeClass(n);
        else if ("add&remove" !== o || t.hasClass(n)) {
          if ("multiple" === o) {
            var a = $(
                LAUX.folder.selector.folder +
                  " " +
                  LAUX.folder.selector.highlight
              ).eq(0),
              c = a.index(),
              l = t.index(),
              i = { before: a.parent(), after: t.parent() };
            0 <= c &&
              0 <= l &&
              (i.before[0] === i.after[0]
                ? (d(n),
                  i.before.children().each(function (e, t) {
                    c < l && c <= e && e <= l
                      ? $(t).addClass(n)
                      : l <= e && e <= c && $(t).addClass(n);
                  }))
                : (d(n), t.addClass(n)));
          }
        } else d(n), t.addClass(n);
      else
        t.parents(
          LAUX.folder.selector.folder +
            "." +
            n +
            ", " +
            LAUX.folder.selector.subFolder +
            "." +
            n
        ).length ||
          (t.addClass(n),
          LAUX.folder.checkOnFolder(t) &&
            LAUX.folder.getItems(t).removeClass(n));
      LAUX.folder.callbacks.run("afterActiveHighlight", {
        item: t,
        ev: e,
        class: n,
        action: o,
        key: r,
      });
    }
    function d(t) {
      try {
        $(
          LAUX.folder.selector.folder +
            ", " +
            LAUX.folder.selector.folder +
            " " +
            LAUX.folder.selector.highlight
        ).removeClass(t);
      } catch (e) {
        $console.systemLog.write(
          'LAUX => highlightFolderAndItemsHandler() => clearAllHighlights($class: "' +
            t +
            '") => keyboard key: "' +
            r +
            '"',
          e
        );
      }
    }
  } catch (e) {
    $console.systemLog.write(
      'LAUX => highlightFolderAndItemsHandler() => keyboard key: "' + r + '"',
      e
    );
  }
}
function checkaOnFolderDnD(e, t, o) {
  try {
    return (
      LAUX.folder.DnD.enabled &&
        (t.hasClass(LAUX.folder.selector.folder.slice(1)) ||
        t.hasClass(LAUX.folder.selector.subFolder.slice(1))
          ? o(t, e)
          : t.hasClass(LAUX.folder.selector.item.slice(1)) ||
            t.hasClass(LAUX.folder.selector.info.slice(1))
          ? o(t.parent(), e)
          : (t.hasClass(LAUX.folder.selector.toggle.slice(1)) ||
              t.hasClass(LAUX.folder.selector.explorer.folder.slice(1)) ||
              (t[0].tagName === LAUX.folder.tag.text &&
                (t.parent().hasClass(LAUX.folder.selector.item.slice(1)) ||
                  t.parent().hasClass(LAUX.folder.selector.info.slice(1)) ||
                  t.parent().hasClass(LAUX.folder.selector.folder.slice(1)) ||
                  t
                    .parent()
                    .hasClass(LAUX.folder.selector.subFolder.slice(1)))) ||
              t.hasClass(LAUX.folder.selector.explorer.item.slice(1))) &&
            o(t.parent().parent(), e)),
      !1
    );
  } catch (e) {
    $console.systemLog.write("LAUX => checkaOnFolderOrFileDnD()", e);
  }
}
(LAUX.normalize = {
  selector: function (e, t) {
    try {
      return e && "string" == typeof e
        ? ("." === e.slice(0, 1) || "#" !== e.slice(0, 1)
            ? (e = t
                ? e.replace(/[^A-z+^0-9]/g, "")
                : "." + e.replace(/[^A-z+^0-9]/g, ""))
            : "#" === e.slice(0, 1) &&
              (e = t
                ? e.replace(/[^A-z+^0-9]/g, "")
                : "#" + e.replace(/[^A-z+^0-9]/g, "")),
          isNaN(parseInt(e.slice(1))) ||
            (e = t
              ? e.slice(parseInt(e.slice(1)).toString().length)
              : e.slice(0, 1) +
                e.slice(1 + parseInt(e.slice(1)).toString().length)),
          e.replace(/\^/g, ""))
        : e;
    } catch (e) {
      $console.systemLog.write("LAUX.normalize.selector()", e);
    }
  },
}),
  (LAUX.runCallbacks = function (e, t, o) {
    try {
      var r = e[t];
      for (prop in r) r[prop] instanceof Function && r[prop](o);
    } catch (e) {
      $console.systemLog.write("LAUX.dropdown.callbacks.run()", e);
    }
  }),
  (LAUX.extension.callbacks = {
    focus: {},
    blur: {},
    run: function (e, t) {
      try {
        LAUX.runCallbacks(LAUX.extension.callbacks, e, t);
      } catch (e) {
        $console.systemLog.write("LAUX.checkbox.callbacks.run()", e);
      }
    },
  }),
  (LAUX.checkbox.callbacks = {
    beforeActivate: {},
    afterActivate: {},
    run: function (e, t) {
      try {
        LAUX.runCallbacks(LAUX.checkbox.callbacks, e, t);
      } catch (e) {
        $console.systemLog.write("LAUX.checkbox.callbacks.run()", e);
      }
    },
  }),
  (LAUX.radio.callbacks = {
    beforeActivate: {},
    afterActivate: {},
    run: function (e, t) {
      try {
        LAUX.runCallbacks(LAUX.radio.callbacks, e, t);
      } catch (e) {
        $console.systemLog.write("LAUX.radio.callbacks.run()", e);
      }
    },
  }),
  (LAUX.modal.callbacks = {
    beforeOpen: {},
    afterOpen: {},
    run: function (e, t) {
      try {
        LAUX.runCallbacks(LAUX.modal.callbacks, e, t);
      } catch (e) {
        $console.systemLog.write("LAUX.modal.callbacks.run()", e);
      }
    },
  }),
  (LAUX.dropdown.callbacks = {
    beforeActivate: {},
    afterActivate: {},
    beforeRemoveItem: {},
    afterRemoveItem: {},
    beforeRemoveDropdown: {},
    afterRemoveDropdown: {},
    beforeOpen: {},
    afterOpen: {},
    run: function (e, t) {
      try {
        LAUX.runCallbacks(LAUX.dropdown.callbacks, e, t);
      } catch (e) {
        $console.systemLog.write("LAUX.dropdown.callbacks.run()", e);
      }
    },
  }),
  (LAUX.dropdown.getVal = function (e) {
    try {
      return e ? $(e).attr(LAUX.dropdown.attribute.value) : void 0;
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => LAUX.dropdown.getVal()", e);
    }
  }),
  (LAUX.dropdown.getIndex = function (e) {
    try {
      return e ? parseInt($(e).attr(LAUX.dropdown.attribute.index)) : void 0;
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => LAUX.dropdown.getIndex()", e);
    }
  }),
  (LAUX.dropdown.getItems = function (e) {
    try {
      return e.find(
        LAUX.dropdown.selector.subContainer + " " + LAUX.dropdown.selector.item
      );
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => LAUX.dropdown.getIndex()", e);
    }
  }),
  (LAUX.dropdown.getSelectedItem = function (e) {
    try {
      return e.find(LAUX.dropdown.selector.selectedItem);
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => LAUX.dropdown.getIndex()", e);
    }
  }),
  (LAUX.dropdown.create = function (e, t) {
    try {
      var r = $.extend(
          {
            activeItem: 0,
            container: { id: !1, class: !1 },
            state: { disabled: !1, notSelect: !1, removeItem: !1 },
            selectedItem: {
              class: !1,
              title: !1,
              removable: !1,
              text: "Selected item",
            },
            item: { class: "", title: !1 },
            items: [{ name: "", value: "", title: !1 }],
          },
          t || {}
        ),
        s = LAUX.dropdown.tag,
        o = LAUX.dropdown.state,
        n = LAUX.dropdown.selector,
        a = LAUX.dropdown.attribute,
        c = $(document.createElement(s.container)),
        l = $(document.createElement(s.selectedItem)),
        i = $(document.createElement(s.subContainer));
      return (
        c.addClass(n.container.slice(1)).attr(a.index, r.activeItem),
        "string" == typeof r.container.id && c.attr("id", r.container.id),
        "string" == typeof r.container.class && c.addClass(r.container.class),
        r.state.disabled && c.addClass(o.disabled.slice(1)),
        r.state.notSelect && c.addClass(o.notSelect.slice(1)),
        r.state.removeItem && c.addClass(o.removeItem.slice(1)),
        l
          .text(r.selectedItem.text)
          .addClass(n.item.slice(1))
          .addClass(n.selected.slice(1))
          .attr(a.value, r.selectedItem.value),
        "string" == typeof r.selectedItem.class &&
          l.addClass(r.selectedItem.class),
        "string" == typeof r.selectedItem.title &&
          l.attr(a.titleItem, r.selectedItem.title),
        i.addClass(n.subContainer.slice(1)),
        r.state.removable &&
          (c.addClass(o.removable.slice(1)),
          $(document.createElement(s.removableButton))
            .addClass(n.removableButton.slice(1))
            .appendTo(c)),
        c.appendTo(e).append(l).append(i),
        r.items.forEach(function (e, t) {
          var o = $(document.createElement(s.item));
          (o
            .text(e.name)
            .addClass(n.item.slice(1))
            .attr(a.value, e.value)
            .appendTo(i),
          "string" == typeof e.title
            ? o.attr(a.titleItem, e.title)
            : "string" == typeof r.item.title &&
              o.attr(a.titleItem, r.item.title),
          r.state.removeItem) &&
            $(document.createElement(s.removeButton))
              .addClass(n.removeButton.slice(1))
              .appendTo(o);
        }),
        r.state.notSelect || LAUX.dropdown.setActiveItem(c, r.activeIndex),
        appSkin.update(),
        c
      );
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => LAUX.dropdown.create()", e);
    }
  }),
  (LAUX.dropdown.setActiveItem = function (e, t) {
    try {
      if (!(e = $(e)).hasClass(LAUX.dropdown.state.notSelect.slice(1))) {
        void 0 === t && parseInt(e.attr(LAUX.dropdown.attribute.index));
        var o,
          r,
          s = e.find(
            LAUX.dropdown.selector.subContainer +
              " " +
              LAUX.dropdown.selector.item
          ),
          n = s.eq(t);
        -1 < t &&
          t < s.length &&
          (n.length || ((t = 0), (n = s.eq(t))),
          (o = n.attr(LAUX.dropdown.attribute.value)),
          (r = n.text()),
          LAUX.dropdown.callbacks.run("beforeActivate", {
            dropdown: e,
            value: o,
            index: t,
            text: r,
          }),
          e
            .attr(LAUX.dropdown.attribute.index, t)
            .attr(LAUX.dropdown.attribute.value, o)
            .find(LAUX.dropdown.selector.selectedItem)
            .text(r),
          $(LAUX.dropdown.selector.container).removeClass(
            LAUX.dropdown.state.active.slice(1)
          ),
          LAUX.dropdown.callbacks.run("afterActivate", {
            dropdown: e,
            value: o,
            index: t,
            text: r,
          }));
      }
      return e;
    } catch (e) {
      $console.systemLog.write(
        "LAUX.prototype => LAUX.dropdown.setActiveItem()",
        e
      );
    }
  }),
  (LAUX.dropdown.removeAllItems = function (e) {
    try {
      return LAUX.dropdown.getItems(e).remove(), e;
    } catch (e) {
      $console.systemLog.write(
        "LAUX.prototype => LAUX.dropdown.removeAllItems()",
        e
      );
    }
  }),
  (LAUX.dropdown.empty = function (e) {
    try {
      return (
        e
          .attr(LAUX.dropdown.attribute.index, 0)
          .attr(LAUX.dropdown.attribute.value, ""),
        e.hasClass(LAUX.dropdown.state.notSelect.slice(1)) ||
          e.find(LAUX.dropdown.selector.selectedItem).text(""),
        e
      );
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => LAUX.dropdown.empty()", e);
    }
  }),
  (LAUX.dropdown.addItem = function (e, t, o, r) {
    try {
      var s = $(document.createElement("li"));
      if (
        (s
          .addClass(LAUX.dropdown.selector.item.slice(1))
          .attr(LAUX.dropdown.attribute.value, t)
          .text(o)
          .appendTo(e.find(LAUX.dropdown.selector.subContainer)),
        e.hasClass(LAUX.dropdown.state.removeItem.slice(1)))
      )
        $(document.createElement("i"))
          .addClass(LAUX.dropdown.selector.removeButton.slice(1))
          .appendTo(s);
      (1 ===
        e.find(
          LAUX.dropdown.selector.subContainer +
            " " +
            LAUX.dropdown.selector.item
        ).length ||
        r) &&
        LAUX.dropdown.setActiveItem(e, s.index());
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => LAUX.dropdown.addItem()", e);
    }
  }),
  (LAUX.folder.callbacks = {
    beforeTrashItemClick: {},
    afterTrashItemClick: {},
    beforeTrashItemMousedown: {},
    afterTrashItemMousedown: {},
    beforeTrashFolderClick: {},
    afterTrashFolderClick: {},
    beforeTrashFolderMousedown: {},
    afterTrashFolderMousedown: {},
    beforeActiveHighlight: {},
    afterActiveHighlight: {},
    beforeClearHighlight: {},
    afterClearHighlight: {},
    beforeDrop: {},
    afterDrop: {},
    beforeToggleButton: {},
    afterToggleButton: {},
    beforeSetView: {},
    afterSetView: {},
    beforeSetEmptyView: {},
    afterSetEmptyView: {},
    run: function (e, t) {
      try {
        LAUX.runCallbacks(LAUX.folder.callbacks, e, t);
      } catch (e) {
        $console.systemLog.write("LAUX.dropdown.callbacks.run()", e);
      }
    },
  }),
  (LAUX.folder.get = function (e, t) {
    try {
      var o;
      if (t.hasClass(LAUX.folder.selector.item.slice(1)))
        switch (e.toLowerCase()) {
          case "path":
            o = t
              .find("> " + LAUX.folder.selector.explorer.item)
              .attr(LAUX.folder.selector.explorer.pathAttr)
              .gsep();
            break;
          case "name":
            o = t.find("> " + LAUX.folder.tag.text).text();
        }
      else if (
        t.hasClass(LAUX.folder.selector.folder.slice(1)) ||
        t.hasClass(LAUX.folder.selector.subFolder.slice(1))
      )
        switch (e.toLowerCase()) {
          case "path":
            o = t
              .find(
                "> " +
                  LAUX.folder.selector.info +
                  " " +
                  LAUX.folder.selector.explorer.folder
              )
              .attr(LAUX.folder.selector.explorer.pathAttr)
              .gsep();
            break;
          case "name":
            o = t
              .find(
                "> " + LAUX.folder.selector.info + " " + LAUX.folder.tag.text
              )
              .text();
        }
      return o;
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => LAUX.folder.get()", e);
    }
  }),
  (LAUX.folder.set = function (e, t, o, r) {
    try {
      if (o.hasClass(LAUX.folder.selector.item.slice(1))) {
        switch (e.toLowerCase()) {
          case "path":
            o.find("> " + LAUX.folder.selector.explorer.item).attr(
              LAUX.folder.selector.explorer.pathAttr,
              t.gsep()
            );
            break;
          case "name":
            o.find("> " + LAUX.folder.tag.text).text(t);
        }
        r instanceof Function &&
          r({
            $path: o.find("> " + LAUX.folder.selector.explorer.item),
            $name: o.find("> " + LAUX.folder.tag.text),
          });
      } else if (
        o.hasClass(LAUX.folder.selector.folder.slice(1)) ||
        o.hasClass(LAUX.folder.selector.subFolder.slice(1))
      ) {
        switch (e.toLowerCase()) {
          case "path":
            t = o
              .find(
                "> " +
                  LAUX.folder.selector.info +
                  " " +
                  LAUX.folder.selector.explorer.folder
              )
              .attr(LAUX.folder.selector.explorer.pathAttr, t.gsep());
            break;
          case "name":
            t = o
              .find(
                "> " + LAUX.folder.selector.info + " " + LAUX.folder.tag.text
              )
              .text(t);
        }
        r instanceof Function &&
          r({
            $path: o.find(
              "> " +
                LAUX.folder.selector.info +
                " " +
                LAUX.folder.selector.explorer.folder
            ),
            $name: o.find(
              "> " + LAUX.folder.selector.info + " " + LAUX.folder.tag.text
            ),
          });
      }
      return t;
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => LAUX.folder.get()", e);
    }
  }),
  (LAUX.folder.getItems = function (e) {
    try {
      return LAUX.folder.checkOnFolder(e)
        ? e.find(
            LAUX.folder.selector.subFolder + ", " + LAUX.folder.selector.item
          )
        : $("");
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => getItems()", e);
    }
  }),
  (LAUX.folder.getItemOnPath = function (e, t, o) {
    try {
      var r, s;
      return (
        !(!e || !t) &&
        ((e = PATH.normalize(e).gsep()),
        "filefolder" === (t = t.toLowerCase())
          ? ((r = LAUX.folder.selector.explorer.item), (t = "folder"))
          : (r = LAUX.folder.selector.explorer[t]),
        (s =
          o && o.length
            ? o.find(
                r +
                  "[" +
                  LAUX.folder.selector.explorer.pathAttr +
                  '="' +
                  e +
                  '"]'
              )
            : $(
                r +
                  "[" +
                  LAUX.folder.selector.explorer.pathAttr +
                  '="' +
                  e +
                  '"]'
              )),
        "folder" === t ? s.parent().parent() : "item" === t && s.parent())
      );
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => getFolderOnPath()", e);
    }
  }),
  (LAUX.folder.getHighlightItems = function (e) {
    try {
      return e && e.length
        ? e.find(LAUX.folder.selector.highlight)
        : $(LAUX.folder.selector.highlight);
    } catch (e) {
      $console.systemLog.write(
        "LAUX.prototype => LAUX.folder.getHighlightItems()",
        e
      );
    }
  }),
  (LAUX.folder.getOpenedFolders = function (e) {
    try {
      var o = [];
      return (
        e
          .find(
            LAUX.folder.selector.active +
              " > " +
              LAUX.folder.selector.info +
              " > " +
              LAUX.folder.selector.explorer.folder
          )
          .each(function (e, t) {
            o.push($(t).attr(LAUX.folder.selector.explorer.pathAttr));
          }),
        o
      );
    } catch (e) {
      $console.systemLog.write(
        "LAUX.prototype => LAUX.folder.getOpenedFolders()",
        e
      );
    }
  }),
  (LAUX.folder.clearHighlights = function (e) {
    try {
      return (
        LAUX.folder
          .getHighlightItems(e)
          .removeClass(LAUX.folder.selector.highlight.slice(1)),
        e
      );
    } catch (e) {
      $console.systemLog.write(
        "LAUX.prototype => LAUX.folder.getHighlightItems()",
        e
      );
    }
  }),
  (LAUX.notDrop = function (e, t) {
    try {
      $(e).on("dragover drop", t, !1);
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => notDrop()", e);
    }
  }),
  (LAUX.draggable = function (e, t) {
    try {
      $(e).attr("draggable", !1 !== t);
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => draggable()", e);
    }
  }),
  (LAUX.folder.setView = function (e, t) {
    try {
      LAUX.folder.callbacks.run("beforeSetView", {
        value: e,
        beforeValue: LAUX.folder.view,
        notSave: t,
      }),
        (LAUX.folder.view = e || LAUX.folder.view),
        $(LAUX.folder.selector.wrapper).attr(
          LAUX.folder.selector.view,
          LAUX.folder.view
        ),
        LAUX.folder.callbacks.run("afterSetView", {
          value: LAUX.folder.view,
          notSave: t,
        });
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => setView()", e);
    }
  }),
  (LAUX.folder.toggleView = function () {
    try {
      LAUX.folder.setView("list" === LAUX.folder.view ? "tree" : "list");
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => toggleView()", e);
    }
  }),
  (LAUX.folder.checkOnFolder = function (e) {
    try {
      return !(
        !e.hasClass(LAUX.folder.selector.folder.slice(1)) &&
        !e.hasClass(LAUX.folder.selector.subFolder.slice(1))
      );
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => checkOnFolder()", e);
    }
  }),
  (LAUX.folder.checkOnItem = function (e) {
    try {
      return !!e.hasClass(LAUX.folder.selector.item.slice(1));
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => checkOnItem()", e);
    }
  }),
  (LAUX.folder.setEmptyView = function (e) {
    try {
      var t = $(
        LAUX.folder.selector.folder +
          LAUX.folder.selector.empty +
          ", " +
          LAUX.folder.selector.subFolder +
          LAUX.folder.selector.empty
      );
      e ? (LAUX.folder.emptyView.value = e) : (e = LAUX.folder.emptyView.value),
        LAUX.folder.callbacks.run("beforeSetEmptyView", {
          folders: t,
          value: e,
        });
      var o = "show" === e ? "remove" : "add";
      t[o + "Class"](LAUX.folder.emptyView.hide.slice(1)),
        LAUX.folder.callbacks.run("afterSetEmptyView", {
          folders: t,
          value: e,
          Class: o,
        });
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => setEmptyView()", e);
    }
  }),
  (LAUX.folder.getEmptyViewClass = function () {
    try {
      return LAUX.folder.emptyView[LAUX.folder.emptyView.value];
    } catch (e) {
      $console.systemLog.write("LAUX.prototype => setEmptyView()", e);
    }
  }),
  LAUX.notDrop("body", function (e) {
    return !1;
  }),
  LAUX.draggable(LAUX.folder.selector.item),
  window.addEventListener("focus", function (e) {
    document.body.getAttribute(LAUX.extension.attribute.focus) ||
      (document.body.setAttribute(LAUX.extension.attribute.focus, ""),
      LAUX.extension.callbacks.run("focus", { focus: !0 }));
  }),
  window.addEventListener("blur", function (e) {
    document.body.getAttribute(LAUX.extension.attribute.focus) &&
      (document.body.removeAttribute(LAUX.extension.attribute.focus),
      LAUX.extension.callbacks.run("blur", { focus: !1 }));
  }),
  $("body").on("click", LAUX.checkbox.selector, function (e) {
    try {
      LAUX.checkbox.toggle($(this));
    } catch (e) {
      $console.systemLog.write(
        'LAUX => LAUX.checkbox.selector => "click" event',
        e
      );
    }
  }),
  $("body").on("click", LAUX.radio.selector, function (e) {
    try {
      LAUX.radio.set($(this));
    } catch (e) {
      $console.systemLog.write(
        'LAUX => LAUX.radio.selector => "click" event',
        e
      );
    }
  }),
  $("body").on("click", LAUX.modal.selector.closeButton, function (e) {
    try {
      LAUX.modal.close($(this).parents(LAUX.modal.selector.container));
    } catch (e) {
      $console.systemLog.write(
        'LAUX => LAUX.modal.selector => "click" event',
        e
      );
    }
  }),
  $(window).on("load", function (e) {
    try {
      $(LAUX.dropdown.selector.container).each(function (e, t) {
        (t = $(t)).attr(
          LAUX.dropdown.attribute.value,
          t
            .find(
              LAUX.dropdown.selector.subContainer +
                " " +
                LAUX.dropdown.selector.item
            )
            .eq(parseInt(t.attr(LAUX.dropdown.attribute.index)))
            .attr(LAUX.dropdown.attribute.value)
        );
      });
    } catch (e) {
      $console.systemLog.write('LAUX => dropdown => window => "load" event', e);
    }
  }),
  $(document).on("click", function (e) {
    try {
      $(e.target).hasClass(LAUX.dropdown.selector.item.slice(1)) ||
        $(e.target).hasClass(LAUX.dropdown.selector.removeButton.slice(1)) ||
        $(LAUX.dropdown.selector.container).removeClass(
          LAUX.dropdown.state.active.slice(1)
        );
    } catch (e) {
      $console.systemLog.write('LAUX => .dropdown > li => "click" event', e);
    }
  }),
  $("body").on(
    "click",
    LAUX.dropdown.selector.container +
      " " +
      LAUX.dropdown.selector.selectedItem,
    function (e) {
      try {
        if (!$(this).parent().hasClass(LAUX.dropdown.state.disabled.slice(1))) {
          if (
            (LAUX.dropdown.callbacks.run("beforeOpen", $(this).parent()),
            LAUX.dropdown.state.dontOpen)
          )
            return (LAUX.dropdown.state.dontOpen = !1);
          $(LAUX.dropdown.selector.container)
            .not($(this).parent())
            .removeClass(LAUX.dropdown.state.active.slice(1)),
            $(this).parent().toggleClass(LAUX.dropdown.state.active.slice(1)),
            LAUX.dropdown.callbacks.run("afterOpen", $(this).parent());
        }
      } catch (e) {
        $console.systemLog.write(
          'LAUX => LAUX.dropdown.selector.container + " " + LAUX.dropdown.selector.selectedItem => "click" event',
          e
        );
      }
    }
  ),
  $("body").on(
    "click",
    LAUX.dropdown.selector.subContainer + " " + LAUX.dropdown.selector.item,
    function (e) {
      try {
        $(e.target).hasClass(LAUX.dropdown.selector.removeButton.slice(1))
          ? dropdownRemoveItemHandler($(e.target))
          : LAUX.dropdown.setActiveItem(
              $(this).parent().parent(),
              $(this).index()
            );
      } catch (e) {
        $console.systemLog.write(
          'LAUX => LAUX.dropdown.selector.subContainer + " " + LAUX.dropdown.selector.item => "click" event',
          e
        );
      }
    }
  ),
  $("body").on("mousewheel", LAUX.dropdown.selector.selectedItem, function (e) {
    try {
      var t = e.wheelDelta || e.originalEvent.wheelDelta,
        o = $(this).parent(),
        r = LAUX.dropdown.getIndex(o) + t / -120;
      LAUX.dropdown.setActiveItem(o, r),
        o.hasClass(LAUX.dropdown.state.notSelect.slice(1)) ||
          e.preventDefault();
    } catch (e) {
      $console.systemLog.write(
        'LAUX => LAUX.dropdown.selector.selectedItem => "mousewheel" event',
        e
      );
    }
  }),
  $("body").on("click", LAUX.dropdown.selector.removableButton, function (e) {
    try {
      LAUX.dropdown.callbacks.run("beforeRemoveDropdown", $(this).parent());
      var t = $(this).parent().parent();
      $(this).parent().remove(),
        LAUX.dropdown.callbacks.run("afterRemoveDropdown", t);
    } catch (e) {
      $console.systemLog.write(
        'LAUX => LAUX.dropdown.selector.removableButton => "click" event',
        e
      );
    }
  }),
  $("body").on(
    "click",
    LAUX.dropdown.selector.container +
      LAUX.dropdown.state.removeItem +
      " " +
      LAUX.dropdown.selector.removeButton,
    function (e) {
      dropdownRemoveItemHandler($(this));
    }
  ),
  $("body").on("dblclick", LAUX.input.clickEdit.selector.node, function (e) {
    try {
      $(e.target)
        .addClass(LAUX.input.clickEdit.selector.active.slice(1))
        .focus()
        .select(),
        "last" === LAUX.input.clickEdit.cursorPosition
          ? (e.target.selectionStart = e.target.value.length)
          : (e.target.selectionStart = e.target.selectionEnd = 0);
    } catch (e) {
      $console.systemLog.write(
        'LAUX => LAUX.input.clickEdit.selector => "click" event',
        e
      );
    }
  }),
  $("body").on("focusout", function (e) {
    try {
      var t = e.target;
      t instanceof HTMLElement &&
        t.className &&
        $(t).hasClass(LAUX.input.clickEdit.selector.node.slice(1)) &&
        $(t).hasClass(LAUX.input.clickEdit.selector.active.slice(1)) &&
        $(t).removeClass(LAUX.input.clickEdit.selector.active.slice(1));
    } catch (e) {
      $console.systemLog.write(
        'LAUX => LAUX.input.clickEdit.selector => "click" event',
        e
      );
    }
  }),
  $(window).on("load", function (e) {
    try {
      LAUX.input.tabindex || $("input").attr("tabindex", "-1");
    } catch (e) {
      $console.systemLog.write("LAUX => window.load - input tabindex", e);
    }
  }),
  $("body").on("click", LAUX.folder.selector.toggle, function (e) {
    try {
      var t = $(e.target),
        o = t.parent().parent(),
        r = o.find(LAUX.folder.selector.subFolder),
        s = o.hasClass(LAUX.folder.selector.active.slice(1));
      LAUX.folder.callbacks.run("beforeToggleButton", {
        button: t,
        folder: o,
        subFolders: r,
        opened: s,
        classOpened: LAUX.folder.selector.active.slice(1),
      }),
        e.shiftKey
          ? r.addClass(LAUX.folder.selector.active.slice(1))
          : e.ctrlKey
          ? r.removeClass(LAUX.folder.selector.active.slice(1))
          : o.toggleClass(LAUX.folder.selector.active.slice(1)),
        LAUX.folder.callbacks.run("afterToggleButton", {
          button: t,
          folder: o,
          subFolders: r,
          opened: o.hasClass(LAUX.folder.selector.active.slice(1)),
          classOpened: LAUX.folder.selector.active.slice(1),
        });
    } catch (e) {
      $console.systemLog.write(
        'LAUX => LAUX.folder.selector.toggle => "click" event',
        e
      );
    }
  }),
  $("body").on("dblclick", LAUX.folder.selector.folder, function (e) {
    try {
      if (
        e.target.tagName.toLowerCase() === LAUX.folder.tag.text.toLowerCase() &&
        $(e.target.parentNode).hasClass(LAUX.folder.selector.info.slice(1))
      ) {
        var t = $(e.target.parentNode.parentNode),
          o = t.find("> " + LAUX.folder.selector.toggle),
          r = t.find(LAUX.folder.selector.subFolder),
          s = t.hasClass(LAUX.folder.selector.active.slice(1));
        LAUX.folder.callbacks.run("beforeToggleButton", {
          button: o,
          folder: t,
          subFolders: r,
          opened: s,
          classOpened: LAUX.folder.selector.active.slice(1),
        }),
          t.toggleClass(LAUX.folder.selector.active.slice(1)),
          LAUX.folder.callbacks.run("afterToggleButton", {
            button: o,
            folder: t,
            subFolders: r,
            opened: t.hasClass(LAUX.folder.selector.active.slice(1)),
            classOpened: LAUX.folder.selector.active.slice(1),
          });
      }
    } catch (e) {
      $console.systemLog.write(
        'LAUX => LAUX.folder.selector.toggle => "click" event',
        e
      );
    }
  }),
  $("body").on("mouseup", LAUX.folder.selector.toggle, function (e) {
    try {
      if (3 === e.which) {
        var t = $(e.target),
          o = t.parent().parent(),
          r = o.find(LAUX.folder.selector.subFolder),
          s = o.hasClass(LAUX.folder.selector.active.slice(1)),
          n = o.find(
            LAUX.folder.selector.subFolder + LAUX.folder.selector.active
          );
        LAUX.folder.callbacks.run("beforeToggleButton", {
          button: t,
          folder: o,
          subFolders: r,
          opened: s,
        }),
          r.length
            ? s && r.length === n.length
              ? ((s = !1),
                o.removeClass(LAUX.folder.selector.active.slice(1)),
                r.removeClass(LAUX.folder.selector.active.slice(1)))
              : (o.addClass(LAUX.folder.selector.active.slice(1)),
                r.addClass(LAUX.folder.selector.active.slice(1)))
            : o.toggleClass(LAUX.folder.selector.active.slice(1)),
          LAUX.folder.callbacks.run("afterToggleButton", {
            button: t,
            folder: o,
            subFolders: r,
            opened: o.hasClass(LAUX.folder.selector.active.slice(1)),
          });
      }
    } catch (e) {
      $console.systemLog.write(
        'LAUX => LAUX.folder.selector.toggle => "mouseup" event',
        e
      );
    }
  }),
  $("body").on("mousedown", function (t) {
    try {
      var e = $(t.target),
        o = t.which;
      if (
        (1 === o || 3 === o) &&
        e.hasClass(LAUX.folder.selector.trash.slice(1))
      ) {
        var r = e.parent(),
          s = e.parent().parent(),
          n = 1 === o ? "Click" : "Mousedown";
        r.hasClass(LAUX.folder.selector.item.slice(1))
          ? (LAUX.folder.callbacks.run("beforeTrashItem" + n, {
              item: r,
              event: t,
            }),
            r.remove(),
            LAUX.folder.callbacks.run("afterTrashItem" + n, {
              item: r,
              event: t,
            }))
          : (s.hasClass(LAUX.folder.selector.folder.slice(1)) ||
              s.hasClass(LAUX.folder.selector.subFolder.slice(1))) &&
            (LAUX.folder.callbacks.run("beforeTrashFolder" + n, {
              item: s,
              event: t,
            }),
            s.remove(),
            LAUX.folder.callbacks.run("afterTrashFolder" + n, {
              item: s,
              event: t,
            }));
      }
    } catch (e) {
      $console.systemLog.write(
        'LAUX => LAUX.folder.selector.trash => "mousedown" event, event.which = ' +
          t.which,
        e
      );
    }
  }),
  $("body").on("mousedown", function (e) {
    try {
      if (1 === e.which) {
        var t = $(e.target);
        e.altKey || e.ctrlKey || e.shiftKey
          ? e.ctrlKey
            ? highlightFolderAndItemsHandler(e, t, "add", "ctrl")
            : e.shiftKey &&
              highlightFolderAndItemsHandler(e, t, "multiple", "shift")
          : highlightFolderAndItemsHandler(e, t, "add&remove", "not-key");
      }
    } catch (e) {
      $console.systemLog.write(
        'LAUX => highlight items => "mousedown" event - "set highlight"',
        e
      );
    }
  }),
  $("body").on("mouseup", function (e) {
    try {
      if (1 === e.which) {
        var t = $(e.target);
        e.altKey && highlightFolderAndItemsHandler(e, t, "remove", "alt");
      }
    } catch (e) {
      $console.systemLog.write(
        'LAUX => highlight items => "mouseup" event - "set highlight"',
        e
      );
    }
  }),
  $("body").on("dragstart", function (e) {
    try {
      var t = $(e.target);
      LAUX.folder.DnD.enabled &&
        (t.hasClass(LAUX.folder.selector.folder.slice(1)) ||
          t.hasClass(LAUX.folder.selector.subFolder.slice(1)) ||
          t.hasClass(LAUX.folder.selector.item.slice(1))) &&
        (LAUX.folder.DnD.nodes = $(
          "body " +
            LAUX.folder.selector.folder +
            LAUX.folder.selector.highlight +
            '[draggable="true"], ' +
            LAUX.folder.selector.folder +
            " " +
            LAUX.folder.selector.highlight +
            '[draggable="true"]'
        ));
    } catch (e) {
      $console.systemLog.write('LAUX => Drag & Drop => "dragstart event"', e);
    }
  }),
  $("body").on("dragover", function (e) {
    try {
      return checkaOnFolderDnD(e, $(e.target), function (e) {
        e.addClass(LAUX.folder.DnD.selector.active.slice(1));
      });
    } catch (e) {
      $console.systemLog.write('LAUX => Drag & Drop => "dragover event"', e);
    }
  }),
  $("body").on("dragleave", function (e) {
    try {
      return checkaOnFolderDnD(e, $(e.target), function (e) {
        e.removeClass(LAUX.folder.DnD.selector.active.slice(1));
      });
    } catch (e) {
      $console.systemLog.write('LAUX => Drag & Drop => "dragleave event"', e);
    }
  }),
  $("body").on("drop", function (o) {
    try {
      return checkaOnFolderDnD(o, $(o.target), function (e) {
        var t = o.altKey
          ? LAUX.folder.DnD.nodes
          : LAUX.folder.DnD.nodes.not(
              e.parents(
                LAUX.folder.selector.folder +
                  ", " +
                  LAUX.folder.selector.subFolder
              )
            );
        if (
          (LAUX.folder.callbacks.run("beforeDrop", {
            item: e,
            nodes: LAUX.folder.DnD.nodes,
            movedItems: t,
            event: o,
          }),
          e.removeClass(LAUX.folder.DnD.selector.active.slice(1)),
          LAUX.folder.DnD.dropBreak ||
            (1 === LAUX.folder.DnD.nodes.parent().length &&
              LAUX.folder.DnD.nodes.parent()[0] === e[0]) ||
            (1 === LAUX.folder.DnD.nodes.length &&
              LAUX.folder.DnD.nodes[0] === e[0]))
        )
          return (LAUX.folder.DnD.dropBreak = !1);
        t.appendTo(e[0]),
          LAUX.folder.callbacks.run("afterDrop", {
            item: e,
            nodes: LAUX.folder.DnD.nodes,
            movedItems: t,
            event: o,
          });
      });
    } catch (e) {
      $console.systemLog.write('LAUX => Drag & Drop => "drop event"', e);
    }
  }),
  $("body").on("click", LAUX.button.execute.selector, function (e) {
    try {
      LAUX.button.execute.open($(this));
    } catch (e) {
      $console.systemLog.write(
        'LAUX => LAUX.button.execute.selector => "click" event',
        e
      );
    }
  }),
  $("body").on("click", LAUX.button.browser.selector, function (e) {
    try {
      return (
        e.preventDefault(), cep.util.openURLInDefaultBrowser(this.href), !1
      );
    } catch (e) {
      $console.systemLog.write(
        'LAUX => LAUX.button.browser.selector => "click" event',
        e
      );
    }
  }),
  $("body").on("click", LAUX.setting.selector.button, function (e) {
    try {
      $(LAUX.setting.selector.wrapper).toggleClass(
        LAUX.setting.selector.active.slice(1)
      ),
        (e.target.tagName === LAUX.setting.tag.logo
          ? $(e.target.parentNode)
          : $(e.target)
        ).toggleClass(LAUX.setting.selector.active.slice(1));
    } catch (e) {
      $console.systemLog.write(
        'LAUX => LAUX.setting.selector.button => "click" event',
        e
      );
    }
  }),
  document.body.setAttribute("data-extID", extID),
  ($debug = {
    state: !1,
    setState: function (e) {
      try {
        ($debug.state = e), LAUX.runCallbacks($debug, "callbacks", e);
      } catch (e) {
        $console.systemLog.write(
          "interface => common.js => $debug.setState()",
          e
        );
      }
    },
    callbacks: {
      setPersistent: function (e) {
        void 0 === e && (e = $debug.state), photoshopPersistent(!e);
      },
    },
  }),
  $debug.callbacks.setPersistent(),
  appSkin
    .add(
      "body, .dropdown__sub, .setting-wrapper, .modal, .popup-window__content, .console, .overlay"
    )
    .update(),
  document.getElementById("send-system-log") &&
    document
      .getElementById("send-system-log")
      .addEventListener("click", function (e) {
        var t =
          "Please attach the file to this letter, the file is located: " +
          $path.project.systemLogPath.gsep() +
          "\n\n";
        (t +=
          "Extension: " +
          extID +
          "\nVersion: " +
          extVersion +
          "\nApplication: " +
          appFullName +
          "\nOperation System: " +
          OSName +
          "\nAPI Version: " +
          APIVersion),
          openURL(
            "mailto:creative@ladygin.pro?subject=Extension - " +
              extID +
              " [ send system log ]&body=" +
              window.encodeURIComponent(t)
          );
      }),
  (function (s) {
    s.fn.equalSizes = function (t, o) {
      var r = s(this);
      function e() {
        if (!o || ("number" == typeof o && window.innerWidth > o)) {
          r[t]("initial");
          var e = r.eq(0)[t]();
          r.each(function () {
            e = s(this)[t]() > e ? s(this)[t]() : e;
          }),
            r[t](e);
        }
      }
      (t = t || "height"),
        e(),
        s(window).bind("resize", function () {
          e();
        });
    };
  })(jQuery),
  (function (s) {
    s.fn.equalSizesExact = function (t, o) {
      var r = s(this);
      function e() {
        if (!o || ("number" == typeof o && window.innerWidth > o)) {
          r[t]("initial"),
            (pfn = "client" + t.slice(0, 1).toUpperCase() + t.slice(1));
          var e = r[0][pfn];
          r.each(function () {
            e = this[pfn] > e ? this[pfn] : e;
          }),
            r[t](e);
        }
      }
      (t = t || "height"),
        e(),
        s(window).bind("resize", function () {
          e();
        });
    };
  })(jQuery);
try {
  createWorkDirectory({
    myScripts: !1,
    logFile: !0,
    systemLog: !0,
    appDirectory: !0,
  });
  var extVersion = "1.0.7",
    extVersionList = ["1.0.0", "1.0.5", "1.0.7"],
    extList = ["Griddder"],
    previousVersion =
      extVersionList[
        extVersionList.length - (1 < extVersionList.length ? 2 : 1)
      ];
  function extVersionString(e) {
    return e && "string" == typeof e
      ? e + extVersion.replace(/\./g, "_")
      : extVersion.replace(/\./g, "_");
  }
  ($path.project.extVersion = (
    $path.project.ext +
    PATH.sep +
    "v" +
    extVersion
  ).gsep()),
    ($console.extVersion = extVersion);
  var supportApps = ["ILST"],
    $setting = {
      button: $(LAUX.setting.selector.button),
      wrapper: $(LAUX.setting.selector.wrapper),
    },
    $sections = {
      wrapper: $(".sections"),
      grid: $("#grid"),
      setMaker: $("#setMaker"),
      stepper: $("#stepper"),
      selector: {
        folder: ".folder-wrapper",
        grid: ".grid-wrapper",
        setMaker: ".setMaker-wrapper",
        stepper: ".stepper-wrapper",
      },
      activeClass: ".active",
      all: function () {
        return $(".sections > div");
      },
      getActive: function () {
        try {
          return $(".sections > .active");
        } catch (e) {
          $console.systemLog.write("varialbles.js => $sections.getActive()", e);
        }
      },
      getNames: function (e) {
        try {
          var t = "";
          return (
            (e = e || ""),
            $(".sections > div").each(function () {
              t +=
                $(this)
                  .attr("class")
                  .replace($sections.activeClass.slice(1), "")
                  .replace($sections.selector.user.slice(1), "") + e;
            }),
            t.slice(0, -e.length || void 0)
          );
        } catch (e) {
          $console.systemLog.write("varialbles.js => $sections.getNames()", e);
        }
      },
      getActiveClass: function () {
        try {
          var e = $(".sections > .active").attr("class");
          return e && (e = e.split(" ")[0]), e;
        } catch (e) {
          $console.systemLog.write(
            "varialbles.js => $sections.getActiveClass()",
            e
          );
        }
      },
      activate: function (e) {
        try {
          if (e && $sections[e]) {
            var t = $sections.activeClass.slice(1);
            return (
              $sections.all().removeClass(t),
              $(".toggle_sections-wrapper .button")
                .removeClass(t)
                .eq($sections[e].index())
                .addClass(t),
              $sections[e].addClass(t)
            );
          }
        } catch (e) {
          $console.systemLog.write("varialbles.js => $sections.activate()", e);
        }
      },
    },
    grid = {
      units: "px",
      cropMarks: {
        setEnabled: function (t) {
          try {
            $(
              ".cropmarks__strokeWidth, .cropmarks__size, .cropmarks__offset, .cropmarks__position, .cropmarks__color__wrapper"
            ).toggleClass("disabled", !t),
              setting.loaded
                ? setting.save(function (e) {
                    return (e.grid.cropMarks.enabled = t), e;
                  })
                : LAUX.checkbox.set($(".cropmarks__enabled"), t);
          } catch (e) {
            $console.systemLog.write("varialbles.js => grid.setEnabled()", e);
          }
        },
      },
      setHEXColor: function (t) {
        try {
          if (t)
            $(".cropmarks__choose_color").css({ "background-color": t }),
              setting.loaded &&
                setting.save(function (e) {
                  return (e.grid.hexColor = t), e;
                });
          else {
            var e = {
              type: LAUX.dropdown.getVal($(".cropmarks__color_type")),
              values:
                ((o = []),
                $(".cropmarks__color_value").each(function () {
                  o.push(parseInt(this.value));
                }),
                "c" !==
                  LAUX.dropdown
                    .getVal($(".cropmarks__color_type"))
                    .toLowerCase()
                    .slice(0, 1) && o.pop(),
                o),
            };
            lustra.evalScript(
              "convertToHEXColor(" + JSON.stringify(e) + ")",
              function (e) {
                grid.setHEXColor(e);
              }
            );
          }
          return grid;
        } catch (e) {
          $console.systemLog.write("varialbles.js => grid.setHEXColor()", e);
        }
        var o;
      },
      setEnableMargin: function (t) {
        try {
          return (
            (t = void 0 === t ? LAUX.checkbox.get($(".margin_enabled")) : t),
            $(".grid__filed__values").toggleClass("none", t),
            $(".grid__field__margin").toggleClass("none", !t),
            setting.loaded &&
              setting.save(function (e) {
                return (e.grid.margin.enabled = t), e;
              }),
            grid
          );
        } catch (e) {
          $console.systemLog.write(
            "varialbles.js => grid.setEnableMargin()",
            e
          );
        }
      },
    },
    setMaker = {
      units: "px",
      setOnArtboardEnabled: function (t) {
        try {
          return (
            $(".setMaker_artboard, .setMaker__field__bleed").toggleClass(
              "disabled",
              !t
            ),
            setting.loaded
              ? setting.save(function (e) {
                  return (e.setMaker.setOnArtboard.enabled = t), e;
                })
              : LAUX.checkbox.set($(".setMaker_artboard_enabled"), t),
            setMaker
          );
        } catch (e) {
          $console.systemLog.write(
            "varialbles.js => setMaker.setOnArtboardEnabled()",
            e
          );
        }
      },
      setOnArtboardSetNameEnabled: function (t) {
        try {
          return (
            $(".setMaker__name").toggleClass("disabled", !t),
            setting.loaded
              ? setting.save(function (e) {
                  return (e.setMaker.setOnArtboard.setName = t), e;
                })
              : LAUX.checkbox.set($(".setMaker_artboard_name"), t),
            setMaker
          );
        } catch (e) {
          $console.systemLog.write(
            "varialbles.js => setMaker.setOnArtboardSetNameEnabled()",
            e
          );
        }
      },
    },
    stepper = { units: "px" },
    contextMenu = { searchTheInternet: { context: "" } },
    library = $path.extScripts.gsep() + "/AI_PS_Library.js",
    setting = {
      data: {
        grid: {
          rows: 3,
          columns: 3,
          rows_gutter: "0 px",
          columns_gutter: "0 px",
          group: "only_cropmarks",
          align: "none",
          bounds: "visible",
          fitToArtboard: !1,
          margin: { enabled: !1, values: ["0 mm", "0 mm", "0 mm", "0 mm"] },
          cropMarks: {
            size: "3 mm",
            offset: "0 mm",
            setName: !0,
            position: "relative",
            enabled: !1,
            attr: {
              strokeWidth: "1 px",
              strokeColor: { type: "cmyk", values: [100, 100, 100, 100] },
            },
          },
        },
        setMaker: {
          rows: 3,
          columns: 3,
          size: "50 px",
          gutter: "10 px",
          offset: "0 px",
          randomOrder: !1,
          ungroupSets: !0,
          name: { body: "MySet_$", prefix: "LA_", suffix: ".svg" },
          setOnArtboard: {
            setName: !0,
            enabled: !0,
            bleed: ["10 px", "10 px"],
            gutter: "10 px",
          },
        },
        stepper: {
          direction: "center",
          position: "relative",
          bounds: "visible",
          copies: 0,
          ghostCopies: !1,
          eachSelection: !1,
          spacing: { x: "0 px", y: "0 px" },
        },
        section: "grid",
        autoUpdate: !0,
        toLogFile: $console.toLogFile,
        console: { collapse: !0, expand: !1 },
      },
      loaded: !1,
      loadTimeout: 0,
      path: $path.extSettings + "user.json",
      root: {
        path: $path.extSettings + "root.json",
        data: { oldVersion: previousVersion },
      },
      create: function () {
        return (
          fs.existsSync($path.extSettings) || makeDir($path.extSettings),
          fs.existsSync(setting.path) ||
            saveFile(setting.path, setting.data, !0),
          fs.existsSync(setting.root.path) ||
            saveFile(setting.root.path, setting.root.data, !0),
          setting
        );
      },
      get: function (e) {
        return setting.create(), readFile(setting.path, !0);
      },
      getRoot: function (e) {
        return setting.create(), readFile(setting.root.path, !0);
      },
      save: function (e) {
        return saveFile(setting.path, e(setting.get()), !0), setting;
      },
      saveRoot: function (e) {
        return saveFile(setting.root.path, e(setting.getRoot()), !0), setting;
      },
      merge: function (t) {
        try {
          return (
            t
              ? setting[
                  "save" +
                    t.slice(0, 1).toUpperCase() +
                    t.slice(1).toLowerCase()
                ](function (e) {
                  return e
                    ? $.extend(!0, {}, setting[t].data, e)
                    : setting[t.toLowerCase()].data;
                })
              : setting.save(function (e) {
                  return e ? $.extend(!0, {}, setting.data, e) : setting.data;
                }),
            setting
          );
        } catch (e) {
          $console.systemLog.write("varialbles.js => setting.merge()", e);
        }
      },
      import: function (e, t) {
        try {
          var o = chooseFiles("", "json", "Choose settings file");
          if (o && o.length) {
            var r = readFile(o, !0);
            return (
              setting.save(function (e) {
                return $.extend(e, r);
              }),
              t instanceof Function && t(o, r),
              confirm(
                "In order that changes became effective it is necessary to reboot extension. To reboot?"
              ) && location.reload(),
              !0
            );
          }
          return !1;
        } catch (e) {
          $console.systemLog.write("varialbles.js => setting.import()", e);
        }
      },
      export: function (e, t) {
        try {
          var o = cep.fs.showSaveDialogEx(
            "Export setting",
            e || $path.project.ext,
            "",
            "setting.json",
            ""
          ).data;
          if (o && o.length) {
            saveFile(o, setting.get(), !0);
            var r = o.gsep(),
              s = PATH.dirname(r).gsep();
            return (
              $console.log(
                "Settings have been exported to folder " +
                  r +
                  " " +
                  LAUX.button.execute.getHTMLString(s, "", "Open directory")
              ),
              t instanceof Function && t(o),
              !0
            );
          }
          return !1;
        } catch (e) {
          $console.systemLog.write("varialbles.js => setting.export()", e);
        }
      },
      normalizeUserSettings: function (e) {
        return (
          setting.save(function (e) {
            return e;
          }),
          e
        );
      },
      load: function (e) {
        try {
          setting.merge("root");
          var t = setting.merge().get();
          return (
            t.console.collapse
              ? $console.collapse($console.collapseHandler)
              : t.console.expand && $console.expand($console.expandHandler),
            ($console.toLogFile = t.toLogFile),
            $(".setting-button i").attr(
              "title",
              $(".setting-button i").attr("title") + extVersion
            ),
            $("#auto-update").attr("data-checked", t.autoUpdate),
            t.autoUpdate && updateExtension(extID, !0),
            $sections.activate(t.section),
            $(".grid_rows").val(t.grid.rows),
            $(".grid_columns").val(t.grid.columns),
            grid.cropMarks.setEnabled(t.grid.cropMarks.enabled),
            $(".grid_rows_gutter")
              .val(t.grid.rows_gutter)
              .attr("data-unit", getUnits(t.grid.rows_gutter)),
            $(".grid_columns_gutter")
              .val(t.grid.columns_gutter)
              .attr("data-unit", getUnits(t.grid.columns_gutter)),
            $(".cropmarks__size_value")
              .val(t.grid.cropMarks.size)
              .attr("data-unit", getUnits(t.grid.cropMarks.size.toString())),
            $(".cropmarks__offset_value")
              .val(t.grid.cropMarks.offset)
              .attr("data-unit", getUnits(t.grid.cropMarks.offset.toString())),
            $(".cropmarks__size__strokeWidth")
              .val(t.grid.cropMarks.attr.strokeWidth)
              .attr(
                "data-unit",
                getUnits(t.grid.cropMarks.attr.strokeWidth.toString())
              ),
            LAUX.dropdown.setActiveItem(
              $(".grid__group"),
              $(
                '.grid__group .dropdown__item[data-value="' +
                  t.grid.group +
                  '"]'
              ).index()
            ),
            LAUX.dropdown.setActiveItem(
              $(".grid__align"),
              $(
                '.grid__align .dropdown__item[data-value="' +
                  t.grid.align +
                  '"]'
              ).index()
            ),
            LAUX.dropdown.setActiveItem(
              $(".grid__bounds"),
              $(
                '.grid__bounds .dropdown__item[data-value="' +
                  t.grid.bounds +
                  '"]'
              ).index()
            ),
            LAUX.dropdown.setActiveItem(
              $(".cropmarks__position"),
              $(
                '.cropmarks__position .dropdown__item[data-value="' +
                  t.grid.cropMarks.position +
                  '"]'
              ).index()
            ),
            LAUX.dropdown.setActiveItem(
              $(".cropmarks__color_type"),
              $(
                '.cropmarks__color_type .dropdown__item[data-value="' +
                  t.grid.cropMarks.attr.strokeColor.type +
                  '"]'
              ).index()
            ),
            $(".cropmarks__color_value").each(function (e) {
              this.value = t.grid.cropMarks.attr.strokeColor.values[e];
            }),
            LAUX.checkbox.set($(".margin_enabled"), t.grid.margin.enabled),
            grid.setEnableMargin(t.grid.margin.enabled).setHEXColor(),
            $(".grid__field__margin input").each(function (e) {
              this.value = t.grid.margin.values[e];
            }),
            $(".setMaker_rows").val(t.setMaker.rows),
            $(".setMaker_columns").val(t.setMaker.columns),
            $(".setMaker_size").val(t.setMaker.size),
            $(".setMaker_gutter").val(t.setMaker.gutter),
            LAUX.checkbox.set($(".setMaker_ungroup"), t.setMaker.ungroupSets),
            LAUX.checkbox.set(
              $(".setMaker_randomOrder"),
              t.setMaker.randomOrder
            ),
            $(".setMaker_artboard_gutter").val(t.setMaker.setOnArtboard.gutter),
            $(".setMaker__field__bleed input").each(function (e) {
              this.value = t.setMaker.setOnArtboard.bleed[e];
            }),
            setMaker
              .setOnArtboardSetNameEnabled(t.setMaker.setOnArtboard.setName)
              .setOnArtboardEnabled(t.setMaker.setOnArtboard.enabled),
            LAUX.checkbox.set(
              $(".setMaker_artboard_enabled"),
              t.setMaker.setOnArtboard.enabled
            ),
            LAUX.checkbox.set(
              $(".setMaker_artboard_name"),
              t.setMaker.setOnArtboard.setName
            ),
            $(".setMaker__name_value").val(t.setMaker.name.body),
            $(".setMaker__name_prefix").val(t.setMaker.name.prefix),
            $(".setMaker__name_suffix").val(t.setMaker.name.suffix),
            LAUX.radio.set(
              $(
                '.stepper__direction [data-direction="' +
                  t.stepper.direction +
                  '"'
              )
            ),
            LAUX.dropdown.setActiveItem(
              $(".stepper__position"),
              $(
                '.stepper__position .dropdown__item[data-value="' +
                  t.stepper.position +
                  '"]'
              ).index()
            ),
            LAUX.dropdown.setActiveItem(
              $(".stepper__bounds"),
              $(
                '.stepper__bounds .dropdown__item[data-value="' +
                  t.stepper.bounds +
                  '"]'
              ).index()
            ),
            $(".stepper__spacing_x")
              .val(t.stepper.spacing.x)
              .attr("data-unit", getUnits(t.stepper.spacing.x.toString())),
            $(".stepper__spacing_y")
              .val(t.stepper.spacing.y)
              .attr("data-unit", getUnits(t.stepper.spacing.y.toString())),
            LAUX.checkbox.set($(".stepper__each"), t.stepper.eachSelection),
            LAUX.checkbox.set($(".stepper__ghost"), t.stepper.ghostCopies),
            $(".stepper__copies").val(t.stepper.copies),
            (setting.loaded = !0),
            setting
          );
        } catch (e) {
          $console.systemLog.write("setting.prototype => load()", e);
        }
      },
      reset: function (e) {
        return saveFile(setting.path, setting.data, !0), setting;
      },
      resetRoot: function (e) {
        return (
          (setting.root.data.updateMessage = !1),
          saveFile(setting.root.path, setting.root.data, !0),
          setting
        );
      },
    },
    featured = {
      message: function (e) {
        try {
          if (extID === extList[0]) {
            var t = $path.project.messages.gsep() + "/v" + e + ".txt";
            fs.existsSync(t) &&
              (featured.checkVersion() &&
                $console.log(
                  '<h3 class="text_normal" style="margin: 0 auto;">v' +
                    e +
                    "</h3>" +
                    readFile(t) +
                    '<div class="button button_full-width" style="text-align: center" onclick="setting.saveRoot(function(data) { data.oldVersion = \'' +
                    extVersion +
                    "'; $console.clear.htmlDefalut(); return data; });\">Do not show this message again</div>",
                  !1,
                  !0
                ),
              Prism.highlightAll());
          }
        } catch (e) {
          $console.systemLog.write("varialbles.js => featured.message()", e);
        }
      },
      checkVersion: function () {
        try {
          var e = setting.getRoot();
          return (
            parseInt(e.oldVersion.replace(/\./g, "")) <
            parseInt(extVersion.replace(/\./g, ""))
          );
        } catch (e) {
          $console.systemLog.write(
            "varialbles.js => featured.checkVersion()",
            e
          );
        }
      },
    };
  setting.create();
} catch (e) {
  $console.systemLog.write("varialbles.js => global", e);
}
function emptyContextMenu() {
  try {
    contextMenu.update(),
      lustra.setContextMenu(contextMenu.empty, function (e) {});
  } catch (e) {
    $console.systemLog.write("contextmenu.js => emptyContextMenu()", e);
  }
}
function la_resolve(e, t, o) {
  try {
    if ("string" == typeof t)
      for (var r = (t = t.split(".")).length, s = e, n = 0; n < r; n++)
        if (s.hasOwnProperty(t[n])) {
          if (!(s[t[n]] instanceof Object)) {
            if (void 0 !== o) {
              s[t[n]] = o;
              break;
            }
            return s;
          }
          if (((s = s[t[n]]), n === r - 1 && void 0 === o)) return s;
        }
    return e;
  } catch (e) {
    $console.systemLog.write("global.js => Object.prototype.la_resolve", e);
  }
}
function numberEvent(e, t, o, r) {
  try {
    var s = t.value,
      n = getUnits(s),
      a = parseFloat(s),
      c = t.getAttribute("type"),
      l = t.getAttribute("name"),
      i = t.getAttribute("data-unit"),
      d = parseFloat(
        t.getAttribute("data-min") || t.getAttribute("min") || -1 / 0
      ),
      p = parseFloat(
        t.getAttribute("data-max") || t.getAttribute("max") || 1 / 0
      );
    r
      ? isNaN(a)
        ? (t.value = "0 " + (i || ""))
        : ((s = a < d ? d : p < a ? p : a),
          "text" === c &&
            (n
              ? ((s += " " + n), t.setAttribute("data-unit", n))
              : i && (s += " " + i)),
          (t.value = s))
      : (o.shiftKey && (e = 0 < e ? e + 9 : e - 9),
        (t.value =
          d <= a + e && a + e <= p
            ? "number" === c.toLowerCase()
              ? a + e
              : a + e + " " + n
            : p < a + e
            ? "number" === c.toLowerCase()
              ? p
              : p + " " + n
            : "number" === c.toLowerCase()
            ? d
            : d + " " + n),
        (s = i ? t.value : parseFloat(t.value))),
      setting.loaded &&
        setting.save(function (e) {
          return la_resolve(e, l, s), e;
        });
  } catch (e) {
    $console.systemLog.write("global.js => numberEvent()", e);
  }
}
function sectionsResizeHanlder() {
  try {
    var e = window.innerWidth,
      t = window.innerHeight;
    $(".sections").css({
      height:
        t - ($setting.button.height() + $console.node.height() + 10) + "px",
    }),
      $(".modal").css({
        height:
          t - ($setting.button.height() + $console.node.height() + 10) + "px",
        width: e - 10 + "px",
      }),
      $(".modal__content").css({
        height:
          t -
          ($setting.button.height() + $console.node.height() + 10 + 65) +
          "px",
      }),
      $(LAUX.setting.selector.wrapper).css({
        "padding-bottom": parseInt($console.node.height()) + 20 + "px",
      });
  } catch (e) {
    $console.systemLog.write("global.js => sectionsResizeHanlder()", e);
  }
}
(LAUX.checkbox.callbacks.afterActivate.cropMarksEnabled = function (e) {
  setting.loaded && e.item.hasClass("cropmarks__enabled")
    ? grid.cropMarks.setEnabled(e.value)
    : e.item.hasClass("margin_enabled") && grid.setEnableMargin(e.value);
}),
  (LAUX.dropdown.callbacks.afterActivate.setColorType = function (t) {
    t.dropdown.hasClass("cropmarks__color_type")
      ? ($(".cropmarks__color__wrapper > :last-child").toggleClass(
          "disabled",
          0 < t.index
        ),
        $(".cropmarks__color_value")
          .attr("max", t.index ? 255 : 100)
          .each(function () {
            numberEvent(0, this, window.event);
          }),
        setting.loaded &&
          setting.save(function (e) {
            return (e.grid.cropMarks.attr.strokeColor.type = t.value), e;
          }))
      : setting.loaded && t.dropdown.hasClass("grid__group")
      ? setting.save(function (e) {
          return (e.grid.group = t.value), e;
        })
      : setting.loaded && t.dropdown.hasClass("grid__align")
      ? setting.save(function (e) {
          return (e.grid.align = t.value), e;
        })
      : setting.loaded && t.dropdown.hasClass("grid__bounds")
      ? setting.save(function (e) {
          return (e.grid.bounds = t.value), e;
        })
      : setting.loaded &&
        t.dropdown.hasClass("cropmarks__position") &&
        setting.save(function (e) {
          return (e.grid.cropMarks.position = t.value), e;
        });
  }),
  $("body").on("click", ".grid_make, .grid_fit", function (e) {
    try {
      var t = {
        rows: parseInt($(".grid_rows").val()),
        columns: parseInt($(".grid_columns").val()),
        gutter: {
          rows: $(".grid_rows_gutter").val(),
          columns: $(".grid_columns_gutter").val(),
        },
        group: LAUX.dropdown.getVal($(".grid__group")),
        align: LAUX.dropdown.getVal($(".grid__align")),
        bounds: LAUX.dropdown.getVal($(".grid__bounds")),
        margin:
          ((r = []),
          $(".grid__field__margin input").each(function () {
            r.push(this.value);
          }),
          r.toString().replace(/ /g, "").replace(/\,/g, " ")),
        fitToArtboard: $(this).hasClass("grid_fit"),
        cropMarks: {
          size: $(".cropmarks__size_value").val(),
          offset: $(".cropmarks__offset_value").val(),
          position: LAUX.dropdown.getVal($(".cropmarks__position")),
          enabled: LAUX.checkbox.get($(".cropmarks__enabled")),
          attr: {
            strokeWidth: $(".cropmarks__size__strokeWidth").val(),
            strokeColor: {
              type: LAUX.dropdown.getVal($(".cropmarks__color_type")),
              values:
                ((o = []),
                $(".cropmarks__color_value").each(function () {
                  o.push(parseInt(this.value));
                }),
                "c" !==
                  LAUX.dropdown
                    .getVal($(".cropmarks__color_type"))
                    .toLowerCase()
                    .slice(0, 1) && o.pop(),
                o),
            },
          },
        },
      };
      lustra.evalScript("makeGrid(" + JSON.stringify(t) + ")", function (e) {
        "undefined" !== e && $console.log(e, !1, !0);
      });
    } catch (e) {
      $console.systemLog.write("grid.js => .grid_make => click event", e);
    }
    var o, r;
  }),
  $("body").on("click", ".cropmarks__choose_color", function (e) {
    try {
      var t = {
        type: LAUX.dropdown.getVal($(".cropmarks__color_type")),
        values:
          ((o = []),
          $(".cropmarks__color_value").each(function () {
            o.push(parseInt(this.value));
          }),
          "c" !==
            LAUX.dropdown
              .getVal($(".cropmarks__color_type"))
              .toLowerCase()
              .slice(0, 1) && o.pop(),
          o),
      };
      lustra.evalScript(
        "gridChooseColor(" + JSON.stringify(t) + ")",
        function (e) {
          try {
            var t = (e = JSON.parse(e)).values.map(function (e) {
              return Math.round(e);
            });
            1 < t.length &&
              ($(".cropmarks__color_value").each(function (e) {
                this.value = t[e];
              }),
              setting.loaded &&
                setting.save(function (e) {
                  return (e.grid.cropMarks.attr.strokeColor.values = t), e;
                }),
              grid.setHEXColor(e.hex));
          } catch (e) {
            $console.systemLog.write(
              "grid.js => .cropmarks__choose_color => click event => evalScript",
              e
            );
          }
        }
      );
    } catch (e) {
      $console.systemLog.write(
        "grid.js => .cropmarks__choose_color => click event",
        e
      );
    }
    var o;
  }),
  $(
    ".svg_margin_top, .svg_margin_right, .svg_margin_bottom, .svg_margin_left"
  ).hover(
    function (e) {
      try {
        var t = "",
          o = $(this).attr("class").split(" ")[2];
        e.shiftKey
          ? (t =
              ".svg_margin_top, .svg_margin_right, .svg_margin_bottom, .svg_margin_left")
          : e.shiftKey || ("svg_margin_top" !== o && "svg_margin_bottom" !== o)
          ? e.shiftKey ||
            ("svg_margin_right" !== o && "svg_margin_left" !== o) ||
            (t = ".svg_margin_right, .svg_margin_left")
          : (t = ".svg_margin_top, .svg_margin_bottom"),
          t &&
            $(t).each(function (e) {
              $(this).attr("class", $(this).attr("class") + " duouble_field");
            });
      } catch (e) {
        $console.systemLog.write(
          "grid.js => .svg_margin_top, .svg_margin_right, .svg_margin_bottom, .svg_margin_left => hover => in",
          e
        );
      }
    },
    function (e) {
      try {
        $(
          ".svg_margin_top, .svg_margin_right, .svg_margin_bottom, .svg_margin_left"
        ).each(function (e) {
          $(this).attr(
            "class",
            $(this).attr("class").replace("duouble_field", "")
          );
        });
      } catch (e) {
        $console.systemLog.write(
          "grid.js => .svg_margin_top, .svg_margin_right, .svg_margin_bottom, .svg_margin_left => hover => out",
          e
        );
      }
    }
  ),
  $("body").on(
    "click",
    ".svg_margin_top, .svg_margin_right, .svg_margin_bottom, .svg_margin_left",
    function (e) {
      try {
        var t = $(this).next().val(),
          o = "",
          r = $(this).attr("class").split(" ")[2];
        e.shiftKey
          ? (o =
              ".svg_margin_top, .svg_margin_right, .svg_margin_bottom, .svg_margin_left")
          : e.shiftKey || ("svg_margin_top" !== r && "svg_margin_bottom" !== r)
          ? e.shiftKey ||
            ("svg_margin_right" !== r && "svg_margin_left" !== r) ||
            (o = ".svg_margin_right, .svg_margin_left")
          : (o = ".svg_margin_top, .svg_margin_bottom"),
          o &&
            ($(o).next().val(t),
            setting.save(function (e) {
              var t;
              return (
                (e.grid.margin.values =
                  ((t = []),
                  $(
                    ".svg_margin_top, .svg_margin_right, .svg_margin_bottom, .svg_margin_left"
                  )
                    .next()
                    .each(function (e) {
                      t.push(this.value),
                        $(this)
                          .prev()
                          .attr(
                            "class",
                            $(this)
                              .prev()
                              .attr("class")
                              .replace(/ undefined/g, "")
                              .replace(" duouble_field", "")
                          );
                    }),
                  t)),
                e
              );
            }));
      } catch (e) {
        $console.systemLog.write(
          "grid.js => .svg_margin_top, .svg_margin_right, .svg_margin_bottom, .svg_margin_left => click event",
          e
        );
      }
    }
  ),
  $(".svg_gutter_rows, .svg_gutter_columns").hover(
    function (e) {
      try {
        $(".svg_gutter_rows, .svg_gutter_columns").attr(
          "class",
          $(this).attr("class") + " duouble_field"
        );
      } catch (e) {
        $console.systemLog.write(
          "grid.js => .svg_gutter_rows, .svg_gutter_columns => hover => in",
          e
        );
      }
    },
    function (e) {
      try {
        $(".svg_gutter_rows, .svg_gutter_columns").attr(
          "class",
          $(this).attr("class").replace(" duouble_field", "")
        );
      } catch (e) {
        $console.systemLog.write(
          "grid.js => .svg_gutter_rows, .svg_gutter_columns => hover => out",
          e
        );
      }
    }
  ),
  $("body").on("click", ".svg_gutter_rows, .svg_gutter_columns", function (e) {
    try {
      var t = $(this).next().val();
      $(".svg_gutter_rows, .svg_gutter_columns").next().val(t),
        setting.save(function (e) {
          return (e.grid.rows_gutter = t), (e.grid.columns_gutter = t), e;
        });
    } catch (e) {
      $console.systemLog.write(
        "grid.js => .svg_gutter_rows, .svg_gutter_columns => click event",
        e
      );
    }
  }),
  $("body").on(
    "mousewheel change keyup",
    ".cropmarks__color_value",
    function (e) {
      try {
        grid.setHEXColor();
      } catch (e) {
        $console.systemLog.write(
          "grid.js => .cropmarks__color_value => click event",
          e
        );
      }
    }
  ),
  (LAUX.checkbox.callbacks.afterActivate.setMakerCheckboxes = function (t) {
    setting.loaded && t.item.hasClass("setMaker_artboard_enabled")
      ? (setMaker.setOnArtboardEnabled(t.value),
        t.value ||
          (setMaker.setOnArtboardSetNameEnabled(t.value),
          LAUX.checkbox.set($(".setMaker_artboard_name"), t.value)))
      : setting.loaded && t.item.hasClass("setMaker_ungroup")
      ? setting.save(function (e) {
          return (e.setMaker.ungroupSets = t.value), e;
        })
      : setting.loaded && t.item.hasClass("setMaker_randomOrder")
      ? setting.save(function (e) {
          return (e.setMaker.randomOrder = t.value), e;
        })
      : setting.loaded &&
        t.item.hasClass("setMaker_artboard_name") &&
        setMaker.setOnArtboardSetNameEnabled(t.value);
  }),
  $("body").on("click", ".setMaker_create, .setMaker_align", function (e) {
    try {
      var t = $(".setMaker_size").val(),
        o = $(this).hasClass("setMaker_align");
      t = 0 === parseInt(t) || isNaN(parseInt(t)) ? "none" : t;
      var r = {
        rows: parseInt($(".setMaker_rows").val()),
        columns: parseInt($(".setMaker_columns").val()),
        size: t,
        gutter: $(".setMaker_gutter").val(),
        offset: "0 px",
        randomOrder: LAUX.checkbox.get($(".setMaker_randomOrder")),
        ungroupSets: LAUX.checkbox.get($(".setMaker_ungroup")),
        name: {
          body: $(".setMaker__name_value").val(),
          prefix: $(".setMaker__name_prefix").val(),
          suffix: $(".setMaker__name_suffix").val(),
        },
        setOnArtboard: {
          setName: LAUX.checkbox.get($(".setMaker_artboard_name")),
          enabled: LAUX.checkbox.get($(".setMaker_artboard_enabled")),
          bleed:
            ((s = []),
            $(".setMaker__field__bleed input").each(function () {
              s.push(this.value);
            }),
            s.toString().replace(/ /g, "").replace(/\,/g, " ")),
          gutter: $(".setMaker_artboard_gutter").val(),
          onlyAlign: o,
        },
      };
      lustra.evalScript(
        "createSetMaker(" + JSON.stringify(r) + ")",
        function (e) {
          "undefined" !== e && $console.log(e, !1, !0);
        }
      );
    } catch (e) {
      $console.systemLog.write(
        "setMaker.js => .setMaker_make, .setMaker_align => click event",
        e
      );
    }
    var s;
  }),
  $(".svg_bleed_top_bottom, .svg_bleed_right_left").hover(
    function (e) {
      try {
        $(".svg_bleed_top_bottom, .svg_bleed_right_left").attr(
          "class",
          $(this).attr("class") + " duouble_field"
        );
      } catch (e) {
        $console.systemLog.write(
          "setMaker.js => .svg_bleed_top_bottom, .svg_bleed_right_left => hover => in",
          e
        );
      }
    },
    function (e) {
      try {
        $(".svg_bleed_top_bottom, .svg_bleed_right_left").attr(
          "class",
          $(this).attr("class").replace(" duouble_field", "")
        );
      } catch (e) {
        $console.systemLog.write(
          "setMaker.js => .svg_bleed_top_bottom, .svg_bleed_right_left => hover => out",
          e
        );
      }
    }
  ),
  $("body").on(
    "click",
    ".svg_bleed_top_bottom, .svg_bleed_right_left",
    function (e) {
      try {
        var t = $(this).next().val();
        $(".svg_bleed_top_bottom, .svg_bleed_right_left").next().val(t),
          setting.save(function (e) {
            return (e.setMaker.setOnArtboard.bleed = [t, t]), e;
          });
      } catch (e) {
        $console.systemLog.write(
          "setMaker.js => .svg_bleed_top_bottom, .svg_bleed_right_left => click event",
          e
        );
      }
    }
  ),
  $("body").on(
    "change",
    ".setMaker__name_value, .setMaker__name_prefix, .setMaker__name_suffix",
    function (e) {
      try {
        if (setting.loaded) {
          var t = $(this).attr("placeholder").toLowerCase(),
            o = this.value;
          setting.save(function (e) {
            return (e.setMaker.name[t] = o), e;
          });
        }
      } catch (e) {
        $console.systemLog.write(
          "setMaker.js => .setMaker__name_value, .setMaker__name_prefix, .setMaker__name_suffix => change event",
          e
        );
      }
    }
  ),
  (LAUX.radio.callbacks.afterActivate.saveStepperDirection = function (t) {
    setting.loaded &&
      t.item.hasClass("stepper__direction_radio") &&
      setting.save(function (e) {
        return (e.stepper.direction = t.item.attr("data-direction")), e;
      });
  }),
  (LAUX.checkbox.callbacks.afterActivate.saveStepperCheckboxes = function (t) {
    setting.loaded && t.item.hasClass("stepper__each")
      ? setting.save(function (e) {
          return (e.stepper.eachSelection = t.value), e;
        })
      : setting.loaded &&
        t.item.hasClass("stepper__ghost") &&
        setting.save(function (e) {
          return (e.stepper.ghostCopies = t.value), e;
        });
  }),
  (LAUX.dropdown.callbacks.afterActivate.saveStepperSetting = function (t) {
    setting.loaded && t.dropdown.hasClass("stepper__position")
      ? setting.save(function (e) {
          return (e.stepper.position = t.value), e;
        })
      : setting.loaded &&
        t.dropdown.hasClass("stepper__bounds") &&
        setting.save(function (e) {
          return (e.stepper.bounds = t.value), e;
        });
  }),
  $(".svg_stepper__spacing_x, .svg_stepper__spacing_y").hover(
    function (e) {
      try {
        $(".svg_stepper__spacing_x, .svg_stepper__spacing_y").attr(
          "class",
          $(this).attr("class") + " duouble_field"
        );
      } catch (e) {
        $console.systemLog.write(
          "stepper.js => .svg_stepper__spacing_x, .svg_stepper__spacing_y => hover => in",
          e
        );
      }
    },
    function (e) {
      try {
        $(".svg_stepper__spacing_x, .svg_stepper__spacing_y").attr(
          "class",
          $(this).attr("class").replace(" duouble_field", "")
        );
      } catch (e) {
        $console.systemLog.write(
          "stepper.js => .svg_stepper__spacing_x, .svg_stepper__spacing_y => hover => out",
          e
        );
      }
    }
  ),
  $("body").on(
    "click",
    ".svg_stepper__spacing_x, .svg_stepper__spacing_y",
    function (e) {
      try {
        var t = $(this).next().val();
        $(".svg_stepper__spacing_x, .svg_stepper__spacing_y").next().val(t),
          setting.save(function (e) {
            return (e.stepper.spacing.x = t), (e.stepper.spacing.y = t), e;
          });
      } catch (e) {
        $console.systemLog.write(
          "stepper.js => .svg_stepper__spacing_x, .svg_stepper__spacing_y => click event",
          e
        );
      }
    }
  ),
  $("body").on(
    "click",
    ".stepper_apply, .stepper_apply_to_copies",
    function (e) {
      try {
        var t = parseInt($(".stepper__copies").val()),
          o = {
            direction: $('.stepper__direction_radio[data-checked="true"]').attr(
              "data-direction"
            ),
            position: LAUX.dropdown.getVal($(".stepper__position")),
            bounds: LAUX.dropdown.getVal($(".stepper__bounds")),
            copies: $(this).hasClass("stepper_apply_to_copies") && !t ? 1 : t,
            ghostCopies:
              !$(this).hasClass("stepper_apply_to_copies") &&
              LAUX.checkbox.get($(".stepper__ghost")),
            eachSelection: LAUX.checkbox.get($(".stepper__each")),
            spacing: {
              x: $(".stepper__spacing_x").val(),
              y: $(".stepper__spacing_y").val(),
            },
          };
        lustra.evalScript(
          "createStepper(" + JSON.stringify(o) + ")",
          function (e) {
            "undefined" !== e && $console.log(e, !1, !0);
          }
        );
      } catch (e) {
        $console.systemLog.write("grid.js => .grid_make => click event", e);
      }
    }
  ),
  (contextMenu.update = function (e) {
    try {
      return (
        (e = e || {}),
        (contextMenu.console =
          '<Menu>                         <MenuItem Id="clear" Label="Clear"/>                        <MenuItem Id="collapse" Label="Collapse" Enabled="true" Checkable="true" Checked="' +
          $console.node.hasClass("console_collapse") +
          '"/>                         <MenuItem Label="---" />                         <MenuItem Id="toLogFile" Label="To log file" Enabled="true" Checkable="true" Checked="' +
          $console.toLogFile +
          '"/>                         <MenuItem Id="clearLogFile" Label="Clear log file"/>                         <MenuItem Id="openLogFile" Label="Open log file"/>                         <MenuItem Label="---" />                         <MenuItem Id="openWorkDir" Label="Open work directory"/>                         ' +
          (function () {
            var e = window.getSelection(),
              t = e.rangeCount;
            if (!t || "" === e.getRangeAt(0).toString()) return "";
            var o = e.focusNode,
              r = $(o.parentNode);
            if (
              ((contextMenu.searchTheInternet.contex = ""),
              r.hasClass("message") &&
                r.parent().hasClass("console") &&
                t &&
                "" !== e.getRangeAt(0).toString())
            ) {
              for (var s = 0; s < t; s++)
                contextMenu.searchTheInternet.contex += e
                  .getRangeAt(s)
                  .toString()
                  .replace(/\t/g, " ")
                  .replace(/\n/g, "")
                  .replace(/\s+/g, " ");
              return '<MenuItem Id="searchTheInternet" Label="Search selection in the internet!"/>';
            }
            return "";
          })() +
          "                         " +
          (function () {
            if ($debug.state)
              return '<MenuItem Label="---" />                                     <MenuItem Id="sourceDir" Label="Open source directory!"/>                                     <MenuItem Id="openSystemLog" Label="Open system log file!"/>                                     <MenuItem Id="openSettings" Label="Open settings file!"/>                                     <MenuItem Id="getHTMLData" Label="Get html data!"/>';
          })() +
          "                     </Menu>"),
        contextMenu
      );
    } catch (e) {
      $console.systemLog.write("contextmenu.js => contextMenu.update()", e);
    }
  }),
  $(document).on("contextmenu", function (e) {
    try {
      var t = $(e.target);
      if (
        (t.hasClass("message") && t.parent().hasClass("console")) ||
        t.hasClass("console") ||
        t.parents(".console").length
      ) {
        if (t.hasClass("console__font-size")) return !1;
        contextMenu.update(),
          lustra.setContextMenu(contextMenu.console, function (e) {
            contextMenu.handler.console(e);
          });
      } else if (
        ("INPUT" === t[0].tagName && "text" === t.attr("type")) ||
        "TEXTAREA" === t[0].tagName
      )
        emptyContextMenu();
      else {
        if (
          null === window.getSelection().anchorNode ||
          "" === window.getSelection().getRangeAt(0).toString() ||
          !$(window.getSelection().focusNode.parentElement).hasClass(
            "donate__money"
          )
        )
          return e.preventDefault(), !1;
        emptyContextMenu();
      }
    } catch (e) {
      $console.systemLog.write('contextmenu.js => "contextmenu" event', e);
    }
  }),
  (contextMenu.handler = {
    console: function (e) {
      try {
        switch (e) {
          case "clear":
            $console.clear.htmlDefalut();
            break;
          case "toLogFile":
            ($console.toLogFile = !$console.toLogFile),
              setting.loaded &&
                setting.save(function (e) {
                  try {
                    return (e.toLogFile = $console.toLogFile), e;
                  } catch (e) {
                    $console.systemLog.write(
                      "contextmenu.js => contextMenu.handler.console()",
                      e
                    );
                  }
                });
            break;
          case "openLogFile":
            $console.open.log();
            break;
          case "clearLogFile":
            $console.clear.log();
            break;
          case "openWorkDir":
            $console.open.extDir();
            break;
          case "searchTheInternet":
            var t =
              "https://www.google.com/?#newwindow=1&q=" +
              contextMenu.searchTheInternet.contex;
            cep.util.openURLInDefaultBrowser(t);
            break;
          case "sourceDir":
            $console.open.sourceDir();
            break;
          case "openSystemLog":
            $console.open.systemLog();
            break;
          case "openSettings":
            execute(setting.path, "");
            break;
          case "getHTMLData":
            prompt(
              "Copy HTML data:",
              window.document.documentElement.innerHTML
            );
            break;
          case "collapse":
            $console.node.removeClass("console_expand"),
              $console.node.hasClass("console_collapse")
                ? $console.unCollapse($console.collapseHandler)
                : $console.collapse($console.collapseHandler);
        }
      } catch (e) {
        $console.systemLog.write(
          "contextmenu.js => contextMenu.handler.console()",
          e
        );
      }
    },
  }),
  lustra.addEventListener(extID + ".console.log", function (e) {
    try {
      $console.log(e.data);
    } catch (e) {
      $console.systemLog.write(
        "hostscripts.js => lustra.addEventListener() => log",
        e
      );
    }
  }),
  lustra.addEventListener(extID + ".console.append", function (e) {
    try {
      var t = e.data || {};
      $console.appendTo.html(t.message, t.sep);
    } catch (e) {
      $console.systemLog.write(
        "hostscripts.js => lustra.addEventListener() => append",
        e
      );
    }
  }),
  lustra.addEventListener(extID + ".openInBrowser", function (e) {
    try {
      cep.util.openURLInDefaultBrowser(e.data);
    } catch (e) {
      $console.systemLog.write(
        "hostscripts.js => lustra.addEventListener() => openInBrowser",
        e
      );
    }
  }),
  lustra.addEventListener(extID + ".openExtensions", function (e) {
    try {
      for (var t = (e = e.data.split(",")).length; t--; )
        lustra.requestOpenExtension(e[t]);
    } catch (e) {
      $console.systemLog.write(
        "hostscripts.js => lustra.addEventListener() => openExtensions",
        e
      );
    }
  }),
  $("body").on("change", ".number_wheel", function (e) {
    try {
      numberEvent(0, this, e, !0);
    } catch (e) {
      $console.systemLog.write(
        "global.js => .la__fields => .grid_row_gutter, .grid_column_gutter => change event",
        e
      );
    }
  }),
  $("body").on("mousewheel", ".number_wheel", function (e) {
    try {
      return (
        e.preventDefault(),
        numberEvent(
          (e.wheelDelta || e.originalEvent.wheelDelta) / 120,
          this,
          e
        ),
        !1
      );
    } catch (e) {
      $console.systemLog.write(
        "global.js => .la__fields => .grid_row_gutter, .grid_column_gutter => change event",
        e
      );
    }
  }),
  $("body").on("keydown", ".number_key", function (e) {
    try {
      var t = 38 === e.keyCode ? 1 : 40 === e.keyCode ? -1 : 0;
      t && (e.preventDefault(), numberEvent(t, this, e));
    } catch (e) {
      $console.systemLog.write(
        "global.js => .la__fields => .grid_row_gutter, .grid_column_gutter => change event",
        e
      );
    }
  }),
  ($console.collapseHandler = function (t) {
    try {
      setting.loaded &&
        setting.save(function (e) {
          return (e.console.expand = !1), (e.console.collapse = t), e;
        }),
        $console.node.hasClass("console_expand_max") || sectionsResizeHanlder();
    } catch (e) {
      $console.systemLog.write("global.js => $console.collapseHandler()", e);
    }
  }),
  ($console.expandHandler = function (t) {
    try {
      setting.loaded &&
        setting.save(function (e) {
          return (e.console.expand = t), (e.console.collapse = !1), e;
        }),
        $console.node.hasClass("console_expand_max") || sectionsResizeHanlder();
    } catch (e) {
      $console.systemLog.write("global.js => $console.collapseHandler()", e);
    }
  }),
  $console.node.on("click", ".button-expand-roll-up", function (e) {
    try {
      $(this).hasClass("active") || sectionsResizeHanlder();
    } catch (e) {
      $console.systemLog.write(
        'global.js => $console.node => .button-expand-roll-up => event "click"',
        e
      );
    }
  }),
  $(window).on("resize", function (e) {
    try {
      sectionsResizeHanlder();
    } catch (e) {
      $console.systemLog.write(
        'global.js => window => "resize" event => sectionsResizeHanlder()',
        e
      );
    }
  }),
  $(window).on("load", function (e) {
    try {
      sectionsResizeHanlder();
    } catch (e) {
      $console.systemLog.write(
        'global.js => window => "load" event => sectionsResizeHanlder()',
        e
      );
    }
  }),
  $("#export-settings").on("click", function (e) {
    try {
      setting.export();
    } catch (e) {
      $console.systemLog.write(
        'global.js => #export-settings - "click" event',
        e
      );
    }
  }),
  $("#import-settings").on("click", function (e) {
    try {
      setting.import();
    } catch (e) {
      $console.systemLog.write(
        'global.js => #import-settings - "click" event',
        e
      );
    }
  }),
  $("#save-settings").on("click", function (e) {
    try {
      $console.log("Setting saved!", !1, !0);
    } catch (e) {
      $console.systemLog.write(
        'global.js => #save-settings - "click" event',
        e
      );
    }
  }),
  $("#reset-settings").on("click", function (e) {
    try {
      setting.reset(), location.reload();
    } catch (e) {
      $console.systemLog.write(
        'global.js => #reset-settings - "click" event',
        e
      );
    }
  }),
  $("#reload-ext").on("click", function (e) {
    try {
      location.reload();
    } catch (e) {
      $console.systemLog.write('global.js => #reload-ext - "click" event', e);
    }
  }),
  $("#close-ext").on("click", function (e) {
    try {
      lustra.closeExtension();
    } catch (e) {
      $console.systemLog.write('global.js => #close-ext - "click" event', e);
    }
  }),
  $("#check-for-updates").on("click", function (e) {
    try {
      var t = $(this);
      t.addClass("spinner_animate"),
        updateExtension(extID, !1, !1, {
          success: function () {
            t.removeClass("spinner_animate");
          },
          error: function () {
            t.removeClass("spinner_animate");
          },
        });
    } catch (e) {
      $console.systemLog.write(
        'global.js => #check-for-updates - "click" event',
        e
      );
    }
  }),
  (function () {
    var o = ".grid_rows, .grid_columns, .setMaker_rows, .setMaker_columns";
    $(o)
      .prev()
      .hover(
        function (e) {
          try {
            $(this)
              .parent()
              .parent()
              .find(o)
              .prev()
              .attr("class", $(this).attr("class") + " duouble_field");
          } catch (e) {
            $console.systemLog.write(
              "grid.js => grid & setMaker => rows & columns => hover => in",
              e
            );
          }
        },
        function (e) {
          try {
            $(this)
              .parent()
              .parent()
              .find(o)
              .prev()
              .attr(
                "class",
                $(this).attr("class").replace(" duouble_field", "")
              );
          } catch (e) {
            $console.systemLog.write(
              "grid.js => grid & setMaker => rows & columns => hover => out",
              e
            );
          }
        }
      ),
      $(o)
        .prev()
        .on("click", function (e) {
          try {
            $(this).parent().parent().find(o).val($(this).next().val());
            var t = $(this).parents(".grid-wrapper").length
              ? "grid"
              : "setMaker";
            setting.save(function (e) {
              return (
                (e[t].rows = parseInt($("." + t + "_rows").val())),
                (e[t].columns = parseInt($("." + t + "_columns").val())),
                e
              );
            });
          } catch (e) {
            $console.systemLog.write(
              "grid.js => grid & setMaker => rows & columns => click event",
              e
            );
          }
        });
  })(),
  $(".toggle_sections-wrapper").on("click", ".button", function (e) {
    e.preventDefault();
    var t = this.getAttribute("data-section");
    $sections.activate(t),
      setting.save(function (e) {
        return (e.section = t), e;
      });
  }),
  lustra.evalScript('getXLib("' + $path.extScripts.gsep() + '")'),
  lustra.evalScript(
    "setGlobalVariables(" + JSON.stringify({ extID: extID }) + ")"
  ),
  window.addEventListener("load", function (e) {
    setting.load(),
      featured.message(extVersion),
      $(".send-questions").attr(
        "href",
        "mailto:creative@ladygin.pro?subject=Extension - " +
          extID +
          " [ question ]"
      ),
      $(".donate").on("click", "a", function (e) {
        this.href && (e.preventDefault(), openURL(this.href));
      }),
      setTimeout(function () {
        LAUX.extension.show();
      }, setting.loadTimeout);
  }),
  LAUX.extension.clearCache();
