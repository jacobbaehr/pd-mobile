# PoolDash
This app helps you chemically balance your swimming pool.

### Why
I've made 3 pool-care apps in the last decade, with over 50,000 users. However, I work full-time and can't support the apps by myself. I'm releasing the most useful core functionality (the chemical dosing calculator) as a free, open-source project so that anyone can use, investigate, and contribute (shoutout to [@wc0sby](https://github.com/wc0sby) for taking the lead).

The app is written in React Native & will be available on iOS and Android. For now, if you're a developer, here is how you can build & run the app locally:

# To Begin:

## Install the dependencies:

[Homebrew](https://brew.sh/): `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
- This is a package-manager for OS X (it automates the complex installation open-source 3rd-party libraries, such as node)

[node](https://nodejs.org/en/): `brew install node`
- This is the runtime environment for modern javascript-based applications

[yarn](https://yarnpkg.com/en/): `npm install yarn`
- This manages 3rd-party open-source javascript libraries efficiently (sort-of like a more specific version of brew)

[TypeScript](https://www.typescriptlang.org/): `npm install -g typescript`
- This is the programming language that PoolDash is written in! It is Javascript with static types & even more dependencies 😅.

[React Native](https://facebook.github.io/react-native/): `npm install -g react-native-cli`
- This is the application framework that PoolDash is built on. It allows the app to run on both iOS and Android devices!

## Build the project

1) `git clone git@github.com:Gazzini/PoolDash.git` (or download the .zip file)

2) `cd PoolDash`

3) `yarn install` -- Installs all of the dependencies listed in package.json

4) `tsc -w` -- Compiles all of the typescript code into javascript code (use "yarn run" to ensure you're using the local typescript version)

5) `react-native start` -- Prepares the react-native environment to serve javascript files to your iOS or Android app (do this in a separate terminal tab)

6) `react-native run-ios` -- Compiles & Runs the Xcode project, Launches the simulator, and loads your javascript bundle from your local React server


# Required Next Steps:
- [ ] Implement multiple service-plans, allow users to select a "recipe"
- [ ] Move the formulas from `src/InitialData.ts` somewhere it can easily be accessed / edited in isolation
- [ ] Implement [material styles](https://github.com/callstack/react-native-paper)
- [ ] Persistently store chemical records for later viewing
- [ ] Enable cloud-sync (using Realm, for now)
- [ ] Submit to iOS store
- [ ] Submit to Android store
- [ ] Open-source attributions

# Nice-to-haves:
- [ ] Graphs of pool chemicals over time
- [ ] Youtube video links for each step of every "recipe"
- [ ] Secret Project (🙊)
