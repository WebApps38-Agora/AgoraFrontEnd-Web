import React from 'react'
import { Feed } from 'semantic-ui-react'

const feedback = [
  {icon: 'pencil', date: 'Today', summary: 'The colours need changing', likes: 4, user: 'Anonymous',
   title: 'Short hand version'},
  {icon: 'pencil', date: 'Today', summary: 'The colours need changing', likes: 4, user: 'Anonymous',
   title: 'Short hand version'},
  {icon: 'pencil', date: 'Today', summary: 'The colours need changing', likes: 4, user: 'Anonymous',
   title: 'Short hand version'},
  {icon: 'pencil', date: 'Today', summary: 'The colours need changing', likes: 4, user: 'Anonymous',
   title: 'Short hand version', meta: {like: 'likes', icon: 'like'}}
]

const FeedExampleIconLabelShorthand = () => (
  <Feed>
    {feedback.map((feed, index) =>
      <Feed.Event {...feed} />)}
  </Feed>
)

export default FeedExampleIconLabelShorthand
