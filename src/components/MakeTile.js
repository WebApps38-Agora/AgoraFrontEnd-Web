import React from 'react';
import TopicIndexTile from './TopicIndexTile'

export const makeTile = (topics, index) => {
  // get the index from the normalized list
  const topic_id = topics.result[index]
  const topic = topics[topic_id]
  return topic &&
    <TopicIndexTile
      to={"/topic/" + topic.id}
      src={topic.images[0]}
      title={topic.title}
      published_at={topic.published_at}
      views={topic.views}
    />
}
