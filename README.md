## Library

> A UI library based on Ant Design


### notice

- Keep current file directories when editing files
- Use `babel-plugin-import` to implement dynamic import
    - `style` can be only set to `css`
- Must Use `<ConfigProvider />` in your root Component
- Can import `lib/style/mixins/index.less` for our own common variables
- Below components have have dependency styles
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

- config-provider
- icon
    - our own icon will prefix with 'sl-icon-'
- locale-provider
    - `locale` can be passed with our own string, such as 'en', 'zh', 'it', etc.
- modal
- tree
- tree-select


### TODO
- [ ] add documents
- [ ] add private classname prefix to all components
- [ ] sync antd components automatically
- [ ] dynamic import support `{style: true}` for less
- [ ] script for automatically release
