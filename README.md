## Library

> A UI library based on Ant Design


### notice

- Keep current file directories when editing files
- Use `babel-plugin-import` to implement dynamic import
    - `style` can be only set to `css`
- Must Use `<ConfigProvider />` in your root Component
- Can import `lib/style/mixins/index.less` for our own common variables
- When customizing a component styles, please notice to add a prefix at first like `@tabs-prefix-cls: ~'@{theme-prefix}-tabs'`
- When customizing a component, please refer to `<Button />`
- Special components
    - button
        - when adding text wrapped within `<FormattedMessage />` (or some other components but not pure text node only)
         and also using `icon`, please make sure text node should be wrapped within `span` if you want a automatic split
          between `icon` and `text`
    - locale-provider
        - if using react-redux `connect`, make sure setting its option `pure` to `false` to let redux can feel context
         changes, or use `LocaleReceiver` to wrap your root element, or just use our private component `withLocale`
          (detail api is provided below), reference to: https://github.com/reduxjs/react-redux/blob/master/docs/troubleshooting.md
    - modal
        - modal.xxx can not be customized, so please don't use them before we make a customized change, reference to:
         https://github.com/ant-design/ant-design/issues/17001#issuecomment-499907330
- Below components have dependency styles
    - col
    - row
    - card
    - form
    - list
    - menu
    - rate
    - input
    - modal
    - table
    - dropdown
    - anchor
    - slider
    - transfer
    - select
    - upload
    - pagination
    - calendar
    - cascader
    - popconfirm
    - date-picker
    - tree-select
    - auto-complete
    - typography
    - page-header
    - mentions


### customized components

below is our private components or customizing styles

#### customized

- button
- config-provider
- empty
- icon
    - our own icon will prefix with 'sl-icon-'
- locale-provider
    - `locale` can be passed with our own string, such as 'en', 'zh', 'it', etc.
    - `withLocale` is our private custom provider for getting `locale` and `uiLocale` context, you may need it when using
     react-redux `connect` and don't forget to put it before `connect`
- tabs
- tree
- tree-select

#### private

- player


### TODO
- [ ] add documents
- [ ] add private classname prefix to all components
- [ ] sync antd components automatically
- [ ] dynamic import support `{style: true}` for less
- [ ] script for automatically release
