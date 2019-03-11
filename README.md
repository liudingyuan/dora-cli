# dora-cli

A CLI tool to do any interesting things.

dora stands for *Doraemon*.

## Install

npm:

```bash
npm i -g @mii/dora-cli
```

yarn:

```bash
yarn global add @mii/dora-li
```

## Usage

* `init`

  **dora init [dir] [bundler]**: Init a project with special boilerplate.

  ```bash
  dora init react-app webpack
  ```

  Options:

  * `dir`: Directory name.
  * `bundler`: Select a bundler(webpack or rollup).

* `bangumi`

  **dora bangumi [time]**: check bangumi calendar

  ```bash
  dora bangumi
  ```

  options:

  * `time`: `'today'` or `'week'`
