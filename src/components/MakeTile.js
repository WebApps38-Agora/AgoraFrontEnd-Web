import React from 'react';
import TopicIndexTile from './TopicIndexTile'

export const makeTile = (topics, index) => {
  // get the index from the normalized list
  const topic_id = topics.result[index]
  const topic = topics.entities.topic[topic_id]
  console.log("TOPIC");
  console.log(topic_id);
  console.log(topic);
  return topic &&
    <TopicIndexTile
      to={"/topic/" + topic.id}
      src={topic.images[0]}
      title={topic.title}
      published_at={topic.published_at}
      views={topic.views}
    />
}
