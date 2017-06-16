import React from 'react';
import TopicIndexTile from './TopicIndexTile'

export const makeTile = (topics, index) => {
  const topic = topics[Object.keys(topics)[index]]
  return topic &&
    <TopicIndexTile
      to={"/topic/" + topic.id}
      src={topic.images[0]}
      title={topic.title}
      published_at={topic.published_at}
      views={topic.views}
    />
}
