# 개발 환경
webpack4
babel7
템플릿 : handlebar

# 실행 명령어
## dev
```
npm run dev
```

## build
```
npm run build
```

## build:alpha
```
npm run build:alpha
```

## build:beta
```
npm run build:beta
```

## build:rc
```
npm run build:rc
```

# 폴더 & 파일 구성
```
|- configs      // webpack.config는 여기에 정의
    |- webpack.config.common.js  // dev, prod 공통으로 사용할 설정
    |- webpack.config.dev.js     // 개발 환경에서만 사용할 설정
    |- webpack.config.prod.js    // 빌드 환경에서만 사용할 설정
|- dist      // 빌드된 리소스
|- node_modules 
|- src          // 개발 resources는 여기에 정의
    |- fonts
    |- css
        |- scss
    |- images
        |- image.png
    |- js
    |- index.html
|- package.json   
```
## config에 있는 파일에 대한 설명
- webpack.config.common.js 이 파일은 dev, prod 둘다 공통으로 사용하는 설정을 모아둔다. 예를 들면, entry나 module(rule/loader, etc..) 등이 여기에 포함된다.
- webpack.config.dev.js 이 파일은 개발 환경에서만 사용할 설정을 모아둔다. 예를 들면, webpack-dev-server, dev-tool 등이 있을 수 있다.
- webpack.config.prod.js 이 파일에는 빌드 환경에서만 사용할 설정을 모아둔다. 예를들면, uglify, minify, static file fingerprint 등이 있을 수 있다.
(환경에 따라 합쳐주는건 webpack-merge라는 라이브러리를 이용)

# 환경 구성 참고 레퍼런스 
https://github.com/hg-pyun/step-by-step-webpack-config

https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1

https://github.com/jantimon/html-webpack-plugin

https://medium.com/@OutOfBedlam/webpack-%EC%86%8C%EA%B0%9C-d595f93d5c28



# multiple html page guide
- https://medium.com/a-beginners-guide-for-webpack-2/multi-page-applications-4ae2ebfabc37
- https://www.ivarprudnikov.com/static-website-multiple-html-pages-using-webpack-plus-github-example/
- https://stackoverflow.com/questions/33380063/what-is-the-best-way-to-include-babel-polyfill-using-multiple-entry-points

## 셋팅 관련 이슈 
이슈 1)
```
    Invalid CSS after "e": expected 1 selector or at-rule, was "exports = module.ex"
```
해당 부분의 이슈는
```
    module: {
        rules: [{
            test: /\.scss/,
            use: [
                'style-loader',
                'sass-loader',
                'css-loader',
            ]
        }]
    },
``` 
수정 전 코드

```
    module: {
        rules: [{
            test: /\.scss/,
            use: [
                'style-loader',
                'css-loader',
                'sass-loader',
            ]
        }]
    },
```
수정 후 코드
css-loader이 sass-loader보다 늦게 선언이 되서 생긴 이슈
(비슷한 케이스 : https://github.com/webpack-contrib/sass-loader/issues/445)

이슈 2)
Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):
ReferenceError: window is not defined

```
    module: {
        rules: [{
            test: /\.scss/,
            use: [
                MiniCssExtractPlugin.loader,
                'style-loader',
                'css-loader',
                'sass-loader',
            ]
        }]
    },
```
수정 전
```
    module: {
        rules: [{
            test: /\.scss/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                'sass-loader',
            ]
        }]
    },
```
수정 후
style-loader을 삭제해준다.

이슈3) js 폴더 내에 있는 js 파일 모두 번들링
```
    include :[
        path.join(__dirname)
    ],
```
추가 하면 됨.

## 사용한 웹팩 플러그인
- clean-webpack-plugin: 이전에 빌드된 파일을 제거하여 clean build를 하기위해 사용한다.
- html-webpack-plugin: fingerprint를 붙여주기 위해서는 동적으로 JS/CSS 경로를 지정해줘야한다. 동적으로 파일명 path를 붙여주기 위해 사용한다.
- copy-webpack-plugin: 이미지나 기타파일을 복사하기 위해 사용한다.
- mini-css-extract-plugin: css를 추출하기 위해 사용한다.
- html-webpack-harddisk-plugin : ejs파일을 .html 로 변경
- babel/polyfil : ES2015의 새로운 객체(Promise, Map, Set 등등)과 메소드(Array.find, Object.assign 등등)을 사용할 수 없으므로 이를 위해 사용함.
(https://www.zerocho.com/category/ECMAScript/post/57a830cfa1d6971500059d5a)
- handlebars-loader : 핸들바 로더
- handlebar : 핸들바 템플릿

## npm 패키지
- cross-env : 환경 변수 주입에서 많이 사용함.