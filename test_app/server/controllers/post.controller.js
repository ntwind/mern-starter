import Post from '../models/post';
import cuid from 'cuid';
import slug from 'limax';
import sanitizeHtml from 'sanitize-html';
import mongoose from 'mongoose';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getPosts(req, res) {
  Post.find().sort('-dateAdded').exec((err, posts) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ posts });
  });
}

/**
 * Save a post
 * @param req
 * @param res
 * @returns void
 */
export function addPost(req, res) {
  if (!req.body.post.name || !req.body.post.title || !req.body.post.content) {
    res.status(403).end();
  }

  const newPost = new Post(req.body.post);

  // Let's sanitize inputs
  newPost.title = sanitizeHtml(newPost.title);
  newPost.name = sanitizeHtml(newPost.name);
  newPost.content = sanitizeHtml(newPost.content);

  newPost.slug = slug(newPost.title.toLowerCase(), { lowercase: true });
  newPost.cuid = cuid();
  newPost.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post: saved });
  });
}

/**
 * Get a single post
 * @param req
 * @param res
 * @returns void
 */
export function getPost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ post });
  });
}

/**
 * Delete a post
 * @param req
 * @param res
 * @returns void
 */
export function deletePost(req, res) {
  Post.findOne({ cuid: req.params.cuid }).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }

    post.remove(() => {
      res.status(200).end();
    });
  });
}

/**
 * Comment a post
 * @param req
 * @param res
 * @returns void
 */
export function commentPost(req, res) {
  if (!req.body.name || !req.body.comment) {
    res.status(403).end();
  }
  let comment =
    {
      uid: mongoose.Types.ObjectId(),
      name: sanitizeHtml(req.body.name),
      comment: sanitizeHtml(req.body.comment)
    };

  Post.findOneAndUpdate(
    { cuid: req.params.cuid },
    {
      $push:
        {
          comments: comment
        }
    }
  ).exec((err, post) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({comment: comment});
  });
}

export function updateComment(req, res) {
  if (!req.body.uid || !req.body.name || !req.body.comment) {
    res.status(403).end();
  }
  let  ObjectId = mongoose.Types.ObjectId;

  Post.update(
    { cuid: req.params.cuid, "comments.uid": ObjectId(req.body.uid) },
    {
      $set:
        {
          "comments.$.name": sanitizeHtml(req.body.name),
          "comments.$.comment": sanitizeHtml(req.body.comment)
        }
    }
  ).exec((err, post) => {

    if (err) {
      res.status(500).send(err);
    }
    res.status(200).end();
  });
}
