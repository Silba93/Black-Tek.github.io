---
title: Compiling on Windows
---

If you are here you chose to opt out of using the automatic installer script ```bootstrap.bat``` included with the project. If you are just now discovering that BlackTek Server has an automatic installation script called ```bootstrap.bat``` that's ok, you can find it in the root directory of the project folder, all that is needed for getting setup for compiling is to run it. <br>
<br>
Otherwise, continue reading for manual installation:

### Third Party Prerequisites

- [Premake](https://github.com/premake/premake-core) (_dev branch build_)
- [Vcpkg](https://github.com/microsoft/vcpkg)
- [Git]()(optional)

> Prerequisites are handled automatically when using bootstrap method
###### _Vcpkg_

Compiling BlackTek Server on windows will require for vcpkg to be both installed and integrated. The easiest and quickest way to prepare vcpkg when you don't have it already is with the following commands in command prompt. <br>
<br>
If git is installed: (recommended)
```
git clone https://github.com/microsoft/vcpkg.git
cd vcpkg
bootstrap-vcpkg.bat
vcpkg integrate install
```

**If git is not installed:** <br>
<br>
**First**: Download vcpkg repo from this [link](https://github.com/microsoft/vcpkg/archive/refs/heads/master.zip). <br>
**Next**: Extract the folder and run the bootstrap-vcpkg.bat.<br>
**Finally**: Run cmd at your vcpkg's exracted location with the following command.
<br>
<br>
Inside cmd :
```
vcpkg integrate install
```
<br>

###### _Premake_

Once you have successfully installed vcpkg, and integrated the installation, you will need to download the newest [premake](https://github.com/premake/premake-core.git) from the dev branch (must use dev branch, it's the one hyperlinked).

You have two options for a compatible premake binary: <br>
- extract a premake.exe from our releases or nightlies, or
- download latest [premake](https://github.com/premake/premake-core/archive/refs/heads/master.zip) extract it and run Bootstrap.sh

 Once you have a  binary place it inside your BlackTek-Server folder and move to final step of generating the solution file needed for compilation. <br>

######  _Black-Tek-Server.sln_

The last thing required to be able to compile is to generate the project files (.sln) using premake. Open your command prompt terminal in your BlackTek-Server folder and type in the following command:

```premake5 vs2022```

You should see the solution file in your BlackTek-Server folder once premake has finished and you are now ready to open the solution and hit rebuild for Visual Studio (or other IDE) to trigger vcpkg into installing the dependencies and compiling BlackTek-Server.exe and its required .dll files.
