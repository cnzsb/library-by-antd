
## Demo

```javascript
import { Player } from './index'
const { Video } = Player;

function demo1 () {
  return (
    <Player src="url" onShow={() => {console.log('showing modal')}} onClose={() => {console.log('hiding modal')}} />
  )
}

function demo2() {
  return (
    <Video src="url" />
  )
}
```

## Video

| Props | Description | Type | Default Value |
| ----- | ----- | ----- | ----- |
| className | video className | string | - |
| withRef | get video ref | function | - |
| onPlay | triggered when video plays | function | - |
| onPause | triggered when video pauses | function | - |
| src | native video attribute | string | - |
| autoplay | native video attribute | boolean | false |
| controls | native video attribute | boolean | true |
| preload | native video attribute (`auto`,`meta`,`none`) | string | 'meta' |
| ... | support native video attributes | - |

## Player

| Props | Description | Type | Default Value |
| ----- | ----- | ----- | ----- |
| className | initial player icon className | string | - |
| videoClassName | video className | string | - |
| closable | if showing close icon | bool | true |
| maskClosable | when clicking mask, if it's allowed to trigger `onClose` | bool | true |
| continuePlaying | when modal showing, if it should continue playing | bool | true |
| onShow | when modal showing | func | - |
| onClose | when modal closing | func | - |
| src | Video props | string | - |

Supporting `<Video />` native props, such as `src`, `autoplay`, `controls`, `preload`, etc.
