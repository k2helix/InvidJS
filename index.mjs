// api/classes/Channel.ts
import got, { HTTPError } from "got";

// utils/Query.ts
var QueryParams = class {
  fields;
  region;
  sort_by;
  limit;
  q;
  page;
  date;
  duration;
  type;
  features;
  id;
  itag;
  local;
  createQuery() {
    let query = Object.fromEntries(
      Object.entries(this).filter(([key, value]) => value !== void 0)
    );
    return new URLSearchParams(query);
  }
};

// api/enums.ts
var ErrorCodes = /* @__PURE__ */ ((ErrorCodes2) => {
  ErrorCodes2[ErrorCodes2["MissingArgument"] = 1e4] = "MissingArgument";
  ErrorCodes2[ErrorCodes2["InvalidArgument"] = 10001] = "InvalidArgument";
  ErrorCodes2[ErrorCodes2["APIDown"] = 10002] = "APIDown";
  ErrorCodes2[ErrorCodes2["APIError"] = 10003] = "APIError";
  ErrorCodes2[ErrorCodes2["ServerError"] = 10004] = "ServerError";
  ErrorCodes2[ErrorCodes2["ContentBlocked"] = 10005] = "ContentBlocked";
  ErrorCodes2[ErrorCodes2["NotFound"] = 10006] = "NotFound";
  ErrorCodes2[ErrorCodes2["UnknownError"] = 10007] = "UnknownError";
  return ErrorCodes2;
})(ErrorCodes || {});
var FetchTypes = /* @__PURE__ */ ((FetchTypes2) => {
  FetchTypes2["Minimal"] = "minimal";
  FetchTypes2["Basic"] = "basic";
  FetchTypes2["Full"] = "full";
  return FetchTypes2;
})(FetchTypes || {});
var InstanceTypes = /* @__PURE__ */ ((InstanceTypes2) => {
  InstanceTypes2["https"] = "https";
  InstanceTypes2["tor"] = "onion";
  InstanceTypes2["i2p"] = "i2p";
  return InstanceTypes2;
})(InstanceTypes || {});
var InstanceSorting = /* @__PURE__ */ ((InstanceSorting2) => {
  InstanceSorting2["Health"] = "health";
  InstanceSorting2["API"] = "api";
  InstanceSorting2["Type"] = "type";
  return InstanceSorting2;
})(InstanceSorting || {});
var ContentTypes = /* @__PURE__ */ ((ContentTypes2) => {
  ContentTypes2["Video"] = "video";
  ContentTypes2["Playlist"] = "playlist";
  ContentTypes2["Channel"] = "channel";
  ContentTypes2["Movie"] = "movie";
  ContentTypes2["Show"] = "show";
  return ContentTypes2;
})(ContentTypes || {});
var TrendingTypes = /* @__PURE__ */ ((TrendingTypes2) => {
  TrendingTypes2["Music"] = "music";
  TrendingTypes2["Gaming"] = "gaming";
  TrendingTypes2["News"] = "news";
  TrendingTypes2["Movies"] = "movies";
  return TrendingTypes2;
})(TrendingTypes || {});
var VideoSorting = /* @__PURE__ */ ((VideoSorting2) => {
  VideoSorting2["Relevance"] = "relevance";
  VideoSorting2["Rating"] = "rating";
  VideoSorting2["UploadDate"] = "upload_date";
  VideoSorting2["Views"] = "view_count";
  return VideoSorting2;
})(VideoSorting || {});
var CommentSorting = /* @__PURE__ */ ((CommentSorting2) => {
  CommentSorting2["Top"] = "top";
  CommentSorting2["New"] = "new";
  return CommentSorting2;
})(CommentSorting || {});
var Duration = /* @__PURE__ */ ((Duration2) => {
  Duration2["Short"] = "short";
  Duration2["Medium"] = "medium";
  Duration2["Long"] = "long";
  return Duration2;
})(Duration || {});
var DateValues = /* @__PURE__ */ ((DateValues2) => {
  DateValues2["Hour"] = "hour";
  DateValues2["Today"] = "today";
  DateValues2["Week"] = "week";
  DateValues2["Month"] = "month";
  DateValues2["Year"] = "year";
  return DateValues2;
})(DateValues || {});
var ChannelVideosSorting = /* @__PURE__ */ ((ChannelVideosSorting2) => {
  ChannelVideosSorting2["Newest"] = "newest";
  ChannelVideosSorting2["Popular"] = "popular";
  ChannelVideosSorting2["Oldest"] = "oldest";
  return ChannelVideosSorting2;
})(ChannelVideosSorting || {});
var ChannelPlaylistsSorting = /* @__PURE__ */ ((ChannelPlaylistsSorting2) => {
  ChannelPlaylistsSorting2["Newest"] = "newest";
  ChannelPlaylistsSorting2["Popular"] = "popular";
  ChannelPlaylistsSorting2["Last"] = "last";
  return ChannelPlaylistsSorting2;
})(ChannelPlaylistsSorting || {});
var AudioQuality = /* @__PURE__ */ ((AudioQuality2) => {
  AudioQuality2["Low"] = "AUDIO_QUALITY_LOW";
  AudioQuality2["Medium"] = "AUDIO_QUALITY_MEDIUM";
  return AudioQuality2;
})(AudioQuality || {});
var ImageQuality = /* @__PURE__ */ ((ImageQuality2) => {
  ImageQuality2["HD"] = "maxres";
  ImageQuality2["HDDefault"] = "maxresdefault";
  ImageQuality2["SDDefault"] = "sddefault";
  ImageQuality2["High"] = "high";
  ImageQuality2["Medium"] = "medium";
  ImageQuality2["Low"] = "default";
  return ImageQuality2;
})(ImageQuality || {});

// api/errors/APIError.ts
var APIError = class _APIError extends Error {
  code;
  isFatal;
  constructor(message) {
    super(message);
    this.name = "APIError";
    this.code = 10003 /* APIError */;
    this.isFatal = true;
    Object.setPrototypeOf(this, _APIError.prototype);
  }
};

// api/errors/APIDownError.ts
var APIDownError = class _APIDownError extends Error {
  code;
  isFatal;
  constructor(message) {
    super(message);
    this.name = "APIDownError";
    this.code = 10002 /* APIDown */;
    this.isFatal = false;
    Object.setPrototypeOf(this, _APIDownError.prototype);
  }
};

// api/errors/InvalidArgumentError.ts
var InvalidArgumentError = class _InvalidArgumentError extends Error {
  code;
  isFatal;
  constructor(message) {
    super(message);
    this.name = "InvalidArgumentError";
    this.code = 10001 /* InvalidArgument */;
    this.isFatal = true;
    Object.setPrototypeOf(this, _InvalidArgumentError.prototype);
  }
};

// api/errors/MissingArgumentError.ts
var MissingArgumentError = class _MissingArgumentError extends Error {
  code;
  isFatal;
  constructor(message) {
    super(message);
    this.name = "MissingArgumentError";
    this.code = 1e4 /* MissingArgument */;
    this.isFatal = true;
    Object.setPrototypeOf(this, _MissingArgumentError.prototype);
  }
};

// api/errors/UnknownError.ts
var UnknownError = class _UnknownError extends Error {
  code;
  isFatal;
  constructor(message) {
    super(message);
    this.name = "UnknownError";
    this.code = 10007 /* UnknownError */;
    this.isFatal = true;
    Object.setPrototypeOf(this, _UnknownError.prototype);
  }
};

// api/classes/Playlist.ts
var Playlist = class {
  title;
  id;
  url;
  videos;
  videoCount;
  author;
  author_id;
  description;
  thumbnail;
  constructor(title, id, url, videos, videoCount, author, author_id, description, thumbnail) {
    this.title = title;
    this.id = id;
    this.url = url;
    this.videos = videos;
    this.videoCount = videoCount;
    this.author = author;
    this.author_id = author_id;
    this.description = description;
    this.thumbnail = thumbnail;
  }
};

// api/classes/Video.ts
var Video = class {
  title;
  id;
  url;
  formats;
  lengthSeconds;
  length;
  author;
  author_id;
  description;
  date;
  views;
  likes;
  dislikes;
  thumbnails;
  constructor(title, id, url, formats, lengthSeconds, length, author, author_id, description, date, views, likes, dislikes, thumbnails) {
    this.title = title;
    this.id = id;
    this.url = url;
    this.formats = formats;
    this.lengthSeconds = lengthSeconds;
    this.length = length;
    this.author = author;
    this.author_id = author_id;
    this.description = description;
    this.date = date;
    this.views = views;
    this.likes = likes;
    this.dislikes = dislikes;
    this.thumbnails = thumbnails;
  }
};

// api/errors/ServerError.ts
var ServerError = class _ServerError extends Error {
  code;
  isFatal;
  constructor(message) {
    super(message);
    this.name = "ServerError";
    this.code = 10004 /* ServerError */;
    this.isFatal = false;
    Object.setPrototypeOf(this, _ServerError.prototype);
  }
};

// api/classes/Channel.ts
var useragent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0";
var Channel = class _Channel {
  name;
  id;
  subs;
  description;
  views;
  isVerified;
  latest_videos;
  constructor(name, id, subs, description, views, isVerified, latest_videos) {
    this.name = name;
    this.id = id;
    this.subs = subs;
    this.description = description;
    this.views = views;
    this.isVerified = isVerified;
    this.latest_videos = latest_videos;
  }
  /**
   * @name fetchRelatedChannels
   * @deprecated This feature is broken on YouTube's side.
   * @description Fetches related channels.
   * @param {Instance} instance - Instance to fetch data from.
   * @param {CommonOptions} [opts] - Related fetch options.
   * @example await channel.fetchRelatedChannels(instance);
   * @example await channel.fetchRelatedChannels(instance, {limit: 5});
   * @returns {Promise<Array<Channel>>} Array of related channels.
   */
  fetchRelatedChannels = async (instance, opts = {
    limit: 0
  }) => {
    if (!instance)
      throw new MissingArgumentError(
        "You must provide an instance to fetch data from!"
      );
    if (instance.api_allowed === false || instance.api_allowed === null)
      throw new APIDownError(
        "The instance you provided does not support API requests or is offline!"
      );
    if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
      throw new InvalidArgumentError(
        "Limit is invalid - must be a number greater than 0!"
      );
    const channels = [];
    const queryURL = `${instance.url}/api/v1/channels/${this.id}/channels`;
    const res = await got.get(queryURL);
    const json = await JSON.parse(res.body);
    try {
      json.relatedChannels.forEach((channel) => {
        if (!opts.limit || opts.limit === 0 || channels.length < opts.limit)
          channels.push(new _Channel(channel.author, channel.authorId));
      });
    } catch (err) {
      if (err instanceof HTTPError) {
        if (err.message.includes("500"))
          throw new ServerError("Internal Server Error");
        else throw new APIError(err.message);
      } else throw new UnknownError(err.message);
    }
    return channels;
  };
  /**
   * @name fetchChannelPlaylists
   * @description Fetches latest channel playlists.
   * @param {Instance} instance - Instance to fetch data from.
   * @param {ChannelPlaylistsOptions} [opts] -  Playlist fetch options.
   * @example await channel.fetchChannelPlaylists(instance);
   * @example await channel.fetchChannelPlaylists(instance, {limit: 3});
   * @returns {Promise<Array<Playlist>>} Array of channel playlists.
   */
  fetchChannelPlaylists = async (instance, opts = {
    limit: 0,
    sorting: "newest" /* Newest */
  }) => {
    if (!instance)
      throw new MissingArgumentError(
        "You must provide an instance to fetch data from!"
      );
    if (instance.api_allowed === false || instance.api_allowed === null)
      throw new APIDownError(
        "The instance you provided does not support API requests or is offline!"
      );
    if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
      throw new InvalidArgumentError(
        "Limit is invalid - must be a number greater than 0!"
      );
    const playlists = [];
    const queryURL = `${instance.url}/api/v1/channels/${this.id}/playlists`;
    const params = new QueryParams();
    if (opts.sorting) params.sort_by = opts.sorting;
    const searchParams = params.createQuery();
    const res = await got.get(queryURL, {
      searchParams,
      headers: { "User-Agent": useragent }
    });
    const json = await JSON.parse(res.body);
    try {
      json.playlists.forEach((playlist) => {
        let playlistUrl = `${instance.url}/playlist?list=${playlist.playlistId}`;
        if (!opts.limit || opts.limit === 0 || playlists.length < opts.limit)
          playlists.push(
            new Playlist(playlist.title, playlist.playlistId, playlistUrl)
          );
      });
    } catch (err) {
      if (err instanceof HTTPError) {
        if (err.message.includes("500"))
          throw new ServerError("Internal Server Error");
        else throw new APIError(err.message);
      } else throw new UnknownError(err.message);
    }
    return playlists;
  };
  /**
   * @name fetchChannelVideos
   * @description Fetches latest channel videos.
   * @param {Instance} instance - Instance to fetch data from.
   * @param {ChannelVideosOptions} [opts] - Video fetch options.
   * @example await channel.fetchChannelVideos(instance);
   * @example await channel.fetchChannelVideos(instance, {limit: 7});
   * @returns {Promise<Array<Video>>} Array of channel videos.
   */
  fetchChannelVideos = async (instance, opts = {
    limit: 0,
    sorting: "newest" /* Newest */
  }) => {
    if (!instance)
      throw new MissingArgumentError(
        "You must provide an instance to fetch data from!"
      );
    if (instance.api_allowed === false || instance.api_allowed === null)
      throw new APIDownError(
        "The instance you provided does not support API requests or is offline!"
      );
    if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
      throw new InvalidArgumentError(
        "Limit is invalid - must be a number greater than 0!"
      );
    const videos = [];
    const queryURL = `${instance.url}/api/v1/channels/${this.id}/videos`;
    const params = new QueryParams();
    if (opts.sorting) params.sort_by = opts.sorting;
    const searchParams = params.createQuery();
    const res = await got.get(queryURL, {
      searchParams,
      headers: { "User-Agent": useragent }
    });
    const json = await JSON.parse(res.body);
    try {
      json.videos.forEach((video) => {
        let videoUrl = `${instance.url}/watch?v=${video.videoId}`;
        if (!opts.limit || opts.limit === 0 || videos.length < opts.limit)
          videos.push(new Video(video.title, video.videoId, videoUrl));
      });
    } catch (err) {
      if (err instanceof HTTPError) {
        if (err.message.includes("500"))
          throw new ServerError("Internal Server Error");
        else throw new APIError(err.message);
      } else throw new UnknownError(err.message);
    }
    return videos;
  };
};

// api/classes/Instance.ts
import got2, { HTTPError as HTTPError2 } from "got";

// api/classes/InstanceStats.ts
var InstanceStats = class {
  software;
  users;
  constructor(software, users) {
    this.software = software;
    this.users = users;
  }
};

// api/classes/SoftwareStats.ts
var SoftwareStats = class {
  name;
  version;
  branch;
  constructor(name, version, branch) {
    this.name = name;
    this.version = version;
    this.branch = branch;
  }
};

// api/classes/UserStats.ts
var UserStats = class {
  total;
  halfYear;
  month;
  reg_allowed;
  constructor(total, halfYear, month, reg_allowed) {
    this.total = total;
    this.halfYear = halfYear;
    this.month = month;
    this.reg_allowed = reg_allowed;
  }
};

// api/classes/Instance.ts
var useragent2 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0";
var Instance = class {
  url;
  type;
  api_allowed;
  health;
  region;
  cors_allowed;
  constructor(url, type, api_allowed, health, region, cors_allowed) {
    this.url = url;
    this.type = type;
    this.api_allowed = api_allowed;
    this.health = health;
    this.region = region;
    this.cors_allowed = cors_allowed;
  }
  /**
   * @name fetchStats
   * @description Fetches stats of an instance.
   * @example await instance.fetchStats();
   * @returns {Promise<InstanceStats>} Instance stats object.
   */
  async fetchStats() {
    let stats;
    try {
      const res = await got2.get(`${this.url}/api/v1/stats`, {
        headers: { "User-Agent": useragent2 }
      });
      const json = await JSON.parse(res.body);
      const software = new SoftwareStats(
        json.software.name,
        json.software.version,
        json.software.branch
      );
      const users = new UserStats(
        json.usage.users.total,
        json.usage.users.activeHalfyear,
        json.usage.users.activeMonth,
        json.openRegistrations
      );
      stats = new InstanceStats(software, users);
    } catch (err) {
      if (err instanceof HTTPError2) {
        if (err.message.includes("500"))
          throw new ServerError("Internal Server Error");
        else throw new APIError(err.message);
      } else throw new UnknownError(err.message);
    }
    return stats;
  }
};

// api/classes/Comment.ts
var Comment = class {
  author;
  author_id;
  text;
  constructor(author, author_id, text) {
    this.author = author;
    this.author_id = author_id;
    this.text = text;
  }
};

// api/classes/Image.ts
var Image = class {
  url;
  width;
  height;
  quality;
  constructor(url, width, height, quality) {
    this.url = url;
    this.width = width;
    this.height = height;
    this.quality = quality;
  }
};

// api/errors/ContentBlockedError.ts
var ContentBlockedError = class _ContentBlockedError extends Error {
  code;
  isFatal;
  constructor(message) {
    super(message);
    this.name = "ContentBlockedError";
    this.code = 10005 /* ContentBlocked */;
    this.isFatal = true;
    Object.setPrototypeOf(this, _ContentBlockedError.prototype);
  }
};

// api/errors/NotFoundError.ts
var NotFoundError = class _NotFoundError extends Error {
  code;
  isFatal;
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.code = 10006 /* NotFound */;
    this.isFatal = true;
    Object.setPrototypeOf(this, _NotFoundError.prototype);
  }
};

// utils/LengthConverter.ts
var convertToString = (time) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60) % 60;
  const seconds = time % 60;
  const length = [hours, minutes, seconds].map((v) => v < 10 ? "0" + v : v).filter((v, i) => v !== "00" || i > 0).join(":");
  return length;
};

// api/classes/Format.ts
var Format = class {
  source;
  tag;
  type;
  container;
  audio_quality;
  audio_sampleRate;
  audio_channels;
  constructor(source, tag, type, container, audio_quality, audio_sampleRate, audio_channels) {
    this.source = source;
    this.tag = tag;
    this.type = type;
    this.container = container;
    this.audio_quality = audio_quality;
    this.audio_sampleRate = audio_sampleRate;
    this.audio_channels = audio_channels;
  }
};

// utils/ObjectCreator.ts
var addFormats = (formats) => {
  const formatArray = [];
  formats.forEach((format) => {
    const container = format.container ? format.container : format.type.split("/")[1].split(";")[0];
    if (!format.type.startsWith("audio")) {
      formatArray.push(
        new Format(format.url, format.itag, format.type, container)
      );
    } else {
      formatArray.push(
        new Format(
          format.url,
          format.itag,
          format.type,
          container,
          format.audioQuality,
          format.audioSampleRate,
          format.audioChannels
        )
      );
    }
  });
  return formatArray;
};
var addThumbnails = (thumbnails) => {
  const thumbnailsArray = [];
  thumbnails.forEach((thumb) => {
    thumbnailsArray.push(
      new Image(thumb.url, thumb.width, thumb.height, thumb.quality)
    );
  });
  return thumbnailsArray;
};
var fillMixData = (author, author_id, description) => {
  const mixAuthor = author ? author : "SYSTEM";
  const authorId = author_id ? author_id : "-1";
  const mixDescription = description ? description : "This playlist was created by the system.";
  return { mixAuthor, authorId, mixDescription };
};

// index.ts
import got3, { HTTPError as HTTPError3 } from "got";
import { PassThrough } from "stream";
import { ReReadable } from "rereadable-stream";
import https from "https";
var useragent3 = "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0";
var fetchInstances = async (opts = {
  api_allowed: "any",
  limit: 0,
  region: "all",
  sorting: "health" /* Health */,
  type: "all"
}) => {
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!"
    );
  if (opts.health && (typeof opts.health !== "number" || opts.health < 0))
    throw new InvalidArgumentError(
      "Health is invalid - must be a number greater than 0!"
    );
  const instances = [];
  try {
    const res = await got3.get("https://api.invidious.io/instances.json", {
      headers: { "User-Agent": useragent3 }
    });
    const json = await JSON.parse(res.body);
    json.forEach((instance) => {
      let health = void 0;
      if (instance[1].monitor !== null) {
        health = instance[1].monitor.uptime;
      }
      if ((!opts.url || opts.url === instance[1].uri) && (!opts.type || opts.type === "all" || instance[1].type === opts.type) && (!opts.region || opts.region === "all" || instance[1].region === opts.region) && (opts.api_allowed === void 0 || opts.api_allowed === "any" || instance[1].api === opts.api_allowed) && (!opts.health || opts.health === "any" || parseFloat(health) >= opts.health) && (!opts.limit || opts.limit === 0 || instances.length < opts.limit)) {
        instances.push(
          new Instance(
            instance[1].uri,
            instance[1].type,
            instance[1].api,
            parseFloat(health),
            instance[1].region,
            instance[1].cors
          )
        );
      } else return false;
    });
  } catch (err) {
    if (err instanceof HTTPError3) {
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  switch (opts.sorting) {
    case "health" /* Health */:
    default: {
      instances.sort((a, b) => {
        if (a.health === void 0 || isNaN(a.health)) return 1;
        if (b.health === void 0 || isNaN(b.health)) return -1;
        return b.health - a.health;
      });
      break;
    }
    case "api" /* API */: {
      instances.sort((a, b) => {
        if (a.api_allowed === true && b.api_allowed === false) return -1;
        if (a.api_allowed === false && b.api_allowed === true) return 1;
        return 0;
      });
    }
    case "type" /* Type */: {
      instances.sort((a, b) => {
        if (a.type === "https" /* https */ && b.type === "onion" /* tor */)
          return -1;
        if (a.type === "onion" /* tor */ && b.type === "i2p" /* i2p */)
          return -1;
        return 0;
      });
    }
  }
  return instances;
};
var getInstance = async (url) => {
  try {
    let api = void 0;
    const stats = await got3.get(`${url}/api/v1/stats`, {
      headers: { "User-Agent": useragent3 }
    });
    const json = await JSON.parse(stats.body);
    if (json.software.name !== "invidious")
      throw new InvalidArgumentError("Please provide a valid Invidious URL!");
    const res = await got3.get(`${url}/api/v1`, {
      headers: { "User-Agent": useragent3 }
    });
    if (res.statusCode === 200) api = true;
    else api = false;
    return new Instance(url, "https" /* https */, api);
  } catch (err) {
    if (err instanceof HTTPError3) {
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
};
var fetchVideo = async (instance, id, opts = {
  region: "US",
  type: "basic" /* Basic */
}) => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!id)
    throw new MissingArgumentError("You must provide a video ID to fetch it!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!"
    );
  let info;
  let url = `${instance.url}/watch?v=${id}`;
  const queryURL = `${instance.url}/api/v1/videos/${id}`;
  const params = new QueryParams();
  switch (opts.type) {
    case "minimal" /* Minimal */: {
      params.fields = "title,videoId";
      break;
    }
    case "basic" /* Basic */: {
      params.fields = "title,videoId,adaptiveFormats,formatStreams,lengthSeconds";
      break;
    }
    case "full" /* Full */: {
      params.fields = "title,videoId,adaptiveFormats,formatStreams,lengthSeconds,author,authorId,description,publishedText,viewCount,likeCount,dislikeCount,videoThumbnails";
      break;
    }
  }
  if (opts.region) params.region = opts.region;
  const searchParams = params.createQuery();
  try {
    const res = await got3.get(queryURL, {
      searchParams,
      headers: { "User-Agent": useragent3 }
    });
    const json = await JSON.parse(res.body);
    switch (opts.type) {
      case "full" /* Full */: {
        const lengthString = convertToString(json.lengthSeconds);
        const formats = addFormats(
          json.formatStreams.concat(json.adaptiveFormats)
        );
        const thumbnails = addThumbnails(json.videoThumbnails);
        info = new Video(
          json.title,
          id,
          url,
          formats,
          json.lengthSeconds,
          lengthString,
          json.author,
          json.authorId,
          json.description,
          json.publishedText,
          json.viewCount,
          json.likeCount,
          json.dislikeCount,
          thumbnails
        );
        break;
      }
      case "basic" /* Basic */:
      default: {
        const lengthString = convertToString(json.lengthSeconds);
        const formats = addFormats(
          json.formatStreams.concat(json.adaptiveFormats)
        );
        info = new Video(
          json.title,
          id,
          url,
          formats,
          json.lengthSeconds,
          lengthString
        );
        break;
      }
      case "minimal" /* Minimal */: {
        info = new Video(json.title, id, url);
        break;
      }
    }
  } catch (err) {
    if (err instanceof HTTPError3) {
      if (err.message.includes("404"))
        throw new NotFoundError("The video you provided was not found!");
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return info;
};
var fetchComments = async (instance, video, opts = {
  limit: 0,
  sorting: "top" /* Top */
}) => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!video)
    throw new MissingArgumentError(
      "You must provide a video to fetch comments!"
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!"
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!"
    );
  const comments = [];
  const queryURL = `${instance.url}/api/v1/comments/${video.id}`;
  const params = new QueryParams();
  if (opts.sorting) params.sort_by = opts.sorting;
  const searchParams = params.createQuery();
  try {
    const res = await got3.get(queryURL, {
      searchParams,
      headers: { "User-Agent": useragent3 }
    });
    const json = await JSON.parse(res.body);
    json.comments.forEach((comment) => {
      if (!opts.limit || opts.limit === 0 || comments.length < opts.limit)
        comments.push(
          new Comment(comment.author, comment.authorId, comment.content)
        );
    });
  } catch (err) {
    if (err instanceof HTTPError3) {
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return comments;
};
var fetchPlaylist = async (instance, id, opts = {
  limit: 0,
  type: "basic" /* Basic */
}) => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!id)
    throw new MissingArgumentError(
      "You must provide a playlist ID to fetch it!"
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!"
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!"
    );
  let info;
  let url = `${instance.url}/playlist?list=${id}`;
  const queryURL = `${instance.url}/api/v1/playlists/${id}`;
  const params = new QueryParams();
  if (opts.page) params.page = opts.page;
  switch (opts.type) {
    case "minimal" /* Minimal */: {
      params.fields = "title,playlistId";
      break;
    }
    case "basic" /* Basic */: {
      params.fields = "title,playlistId,videos";
      break;
    }
    case "full" /* Full */: {
      params.fields = "title,playlistId,videos,author,authorId,description,playlistThumbnail";
      break;
    }
  }
  const searchParams = params.createQuery();
  try {
    const res = await got3.get(queryURL, {
      searchParams,
      headers: { "User-Agent": useragent3 }
    });
    const json = await JSON.parse(res.body);
    switch (opts.type) {
      case "full" /* Full */: {
        const videos = [];
        json.videos.forEach((video) => {
          let videoUrl = `${instance.url}/watch?v=${video.videoId}`;
          if (!opts.limit || opts.limit === 0 || videos.length < opts.limit)
            videos.push(new Video(video.title, video.videoId, videoUrl));
        });
        const data = fillMixData(json.author, json.authorId, json.description);
        info = new Playlist(
          json.title,
          id,
          url,
          videos,
          json.videos.length,
          data.mixAuthor,
          data.authorId,
          data.mixDescription,
          new Image(json.playlistThumbnail, 168, 94, "high" /* High */)
        );
        break;
      }
      case "basic" /* Basic */:
      default: {
        const videos = [];
        json.videos.forEach((video) => {
          let videoUrl = `${instance.url}/watch?v=${video.videoId}`;
          if (!opts.limit || opts.limit === 0 || videos.length < opts.limit)
            videos.push(new Video(video.title, video.videoId, videoUrl));
        });
        info = new Playlist(json.title, id, url, videos, json.videos.length);
        break;
      }
      case "minimal" /* Minimal */: {
        info = new Playlist(json.title, id, url);
        break;
      }
    }
  } catch (err) {
    if (err instanceof HTTPError3) {
      if (err.message.includes("404"))
        throw new NotFoundError("The playlist you provided was not found!");
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return info;
};
var fetchChannel = async (instance, id, opts = {
  type: "basic" /* Basic */
}) => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!id)
    throw new MissingArgumentError(
      "You must provide a channel ID to fetch it!"
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!"
    );
  let info;
  const queryURL = `${instance.url}/api/v1/channels/${id}`;
  const params = new QueryParams();
  switch (opts.type) {
    case "minimal" /* Minimal */: {
      params.fields = "author,authorId";
      break;
    }
    case "basic" /* Basic */: {
      params.fields = "author,authorId,subCount";
      break;
    }
    case "full" /* Full */: {
      params.fields = "author,authorId,subCount,description,totalViews,authorVerified,latestVideos";
      break;
    }
  }
  const searchParams = params.createQuery();
  try {
    const res = await got3.get(queryURL, {
      searchParams,
      headers: { "User-Agent": useragent3 }
    });
    const json = await JSON.parse(res.body);
    switch (opts.type) {
      case "full" /* Full */: {
        info = new Channel(
          json.author,
          json.authorId,
          json.subCount,
          json.description,
          json.totalViews,
          json.authorVerified,
          json.latestVideos
        );
        break;
      }
      case "basic" /* Basic */:
      default: {
        info = new Channel(json.author, json.authorId, json.subCount);
        break;
      }
      case "minimal" /* Minimal */: {
        info = new Channel(json.author, json.authorId);
        break;
      }
    }
  } catch (err) {
    if (err instanceof HTTPError3) {
      if (err.message.includes("404"))
        throw new NotFoundError("The channel you provided was not found!");
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return info;
};
var fetchSearchSuggestions = async (instance, query) => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!query)
    throw new MissingArgumentError("You must provide a search query!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!"
    );
  const suggestions = [];
  const queryURL = `${instance.url}/api/v1/search/suggestions`;
  const params = new QueryParams();
  params.q = query;
  const searchParams = params.createQuery();
  try {
    const res = await got3.get(queryURL, {
      searchParams,
      headers: { "User-Agent": useragent3 }
    });
    const json = await JSON.parse(res.body);
    json.suggestions.forEach((suggestion) => {
      suggestions.push(suggestion);
    });
  } catch (err) {
    if (err instanceof HTTPError3) {
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return suggestions;
};
var searchContent = async (instance, query, opts = {
  limit: 0,
  page: 1,
  region: "US",
  sorting: "relevance" /* Relevance */,
  type: "video" /* Video */
}) => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!query)
    throw new MissingArgumentError("You must provide a search query!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!"
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!"
    );
  const queryURL = `${instance.url}/api/v1/search?q=${query}`;
  const params = new QueryParams();
  params.q = query;
  if (opts.page) params.page = opts.page;
  if (opts.sorting) params.sort_by = opts.sorting;
  if (opts.date) params.date = opts.date;
  if (opts.duration) params.duration = opts.duration;
  if (opts.type) params.type = opts.type;
  if (opts.features) params.features = opts.features.toString();
  if (opts.region) params.region = opts.region;
  const results = [];
  const searchParams = params.createQuery();
  try {
    const res = await got3.get(queryURL, {
      searchParams,
      headers: { "User-Agent": useragent3 }
    });
    const json = await JSON.parse(res.body);
    json.forEach((result) => {
      if (!opts.limit || opts.limit === 0 || results.length < opts.limit)
        switch (result.type) {
          case "video": {
            let videoUrl = `${instance.url}/watch?v=${result.videoId}`;
            results.push(new Video(result.title, result.videoId, videoUrl));
            break;
          }
          case "playlist": {
            const videos = [];
            let playlistUrl = `${instance.url}/playlist?list=${result.playlistId}`;
            result.videos.forEach((video) => {
              let videoUrl = `${instance.url}/watch?v=${video.videoId}`;
              videos.push(new Video(video.title, video.videoId, videoUrl));
            });
            results.push(
              new Playlist(
                result.title,
                result.playlistId,
                playlistUrl,
                videos
              )
            );
            break;
          }
          case "channel": {
            results.push(
              new Channel(result.author, result.authorId, result.subCount)
            );
            break;
          }
        }
    });
  } catch (err) {
    if (err instanceof HTTPError3) {
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return results;
};
var fetchTrending = async (instance, opts = {
  limit: 0,
  region: "US",
  type: "music" /* Music */
}) => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!"
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!"
    );
  const queryURL = `${instance.url}/api/v1/trending`;
  const params = new QueryParams();
  if (opts.region) params.region = opts.region;
  if (opts.type) params.type = opts.type;
  const results = [];
  const searchParams = params.createQuery();
  try {
    const res = await got3.get(queryURL, {
      searchParams,
      headers: { "User-Agent": useragent3 }
    });
    const json = await JSON.parse(res.body);
    json.forEach((result) => {
      let videoUrl = `${instance.url}/watch?v=${result.videoId}`;
      if (!opts.limit || opts.limit === 0 || results.length < opts.limit)
        results.push(new Video(result.title, result.videoId, videoUrl));
    });
  } catch (err) {
    if (err instanceof HTTPError3) {
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      if (err.message.includes("400") || err.message.includes("403"))
        throw new ContentBlockedError(
          "Disabled by administrator - try another instance!"
        );
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return results;
};
var fetchPopular = async (instance, opts = {
  limit: 0
}) => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!"
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!"
    );
  const queryURL = `${instance.url}/api/v1/popular`;
  const results = [];
  try {
    const res = await got3.get(queryURL, {
      headers: { "User-Agent": useragent3 }
    });
    const json = await JSON.parse(res.body);
    json.forEach((result) => {
      let videoUrl = `${instance.url}/watch?v=${result.videoId}`;
      if (!opts.limit || opts.limit === 0 || results.length < opts.limit)
        results.push(new Video(result.title, result.videoId, videoUrl));
    });
  } catch (err) {
    if (err instanceof HTTPError3) {
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      if (err.message.includes("400") || err.message.includes("403"))
        throw new ContentBlockedError(
          "Disabled by administrator - try another instance!"
        );
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return results;
};
var fetchHashtag = async (instance, tag, opts = {
  limit: 0
}) => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!tag) throw new MissingArgumentError("You must provide a valid hashtag!");
  if (instance.api_allowed === false || instance.api_allowed === null)
    throw new APIDownError(
      "The instance you provided does not support API requests or is offline!"
    );
  if (opts.limit && (typeof opts.limit !== "number" || opts.limit < 0))
    throw new InvalidArgumentError(
      "Limit is invalid - must be a number greater than 0!"
    );
  const queryURL = `${instance.url}/api/v1/hashtag/${tag}`;
  const params = new QueryParams();
  const results = [];
  const searchParams = params.createQuery();
  if (opts.page) params.page = opts.page;
  try {
    const res = await got3.get(queryURL, {
      searchParams,
      headers: { "User-Agent": useragent3 }
    });
    const json = await JSON.parse(res.body);
    json.results.forEach((result) => {
      let videoUrl = `${instance.url}/watch?v=${result.videoId}`;
      if (!opts.limit || opts.limit === 0 || results.length < opts.limit)
        results.push(new Video(result.title, result.videoId, videoUrl));
    });
  } catch (err) {
    if (err instanceof HTTPError3) {
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  }
  return results;
};
var saveBlob = async (instance, video, source, opts = {
  parts: 5
}) => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!video)
    throw new MissingArgumentError("You must provide a valid video object!");
  if (!source)
    throw new MissingArgumentError(
      "You must provide a valid video or audio source to fetch a stream from!"
    );
  if (opts && !opts.parts) opts.parts = 1;
  if (opts.parts && opts.parts < 1)
    throw new InvalidArgumentError(
      "A source must be downloaded in at least a single part!"
    );
  if (opts.parts && opts.parts > 10) opts.parts = 10;
  const queryURL = `${instance.url}/latest_version`;
  const params = new QueryParams();
  params.id = video.id;
  params.itag = source.tag;
  params.local = true;
  const searchParams = params.createQuery();
  let length = 0;
  await got3.get(queryURL, {
    headers: { Range: `bytes=0-0`, "User-Agent": useragent3 },
    searchParams
  }).then((res) => {
    var _a;
    if (res.headers["content-range"])
      length = parseInt((_a = res.headers["content-range"]) == null ? void 0 : _a.split("/")[1]);
  }).catch((err) => {
    if (err instanceof HTTPError3) {
      if (err.message.includes("403")) {
        throw new ContentBlockedError(
          "Not allowed to download this video! Perhaps it's from a generated channel?"
        );
      }
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  });
  return new Promise(async (resolve, reject) => {
    const parts = Math.ceil(length / opts.parts);
    const positions = [];
    for (let i = 0; i < opts.parts; i++) {
      positions.push(i * parts);
    }
    const promises = [];
    positions.forEach((position) => {
      const range = `bytes=${position}-${position + parts - 1}`;
      promises.push(
        got3.get(queryURL, {
          headers: { Range: range, "User-Agent": useragent3 },
          responseType: "buffer",
          searchParams
        })
      );
    });
    const responses = await Promise.all(promises);
    const buffer = new ArrayBuffer(length);
    const view = new DataView(buffer);
    let offset = 0;
    responses.forEach((response) => {
      const array = new Uint8Array(response.body);
      for (let i = 0; i < array.length; i++) {
        view.setUint8(offset + i, array[i]);
      }
      offset += array.length;
    });
    const blob = new Blob([buffer], {
      type: source.type.split("/")[0]
    });
    resolve(blob);
  });
};
var saveStream = async (instance, video, source) => {
  if (!instance)
    throw new MissingArgumentError(
      "You must provide an instance to fetch data from!"
    );
  if (!video)
    throw new MissingArgumentError("You must provide a valid video object!");
  if (!source)
    throw new MissingArgumentError(
      "You must provide a valid video or audio source to fetch a stream from!"
    );
  const queryURL = `${instance.url}/latest_version`;
  const params = new QueryParams();
  params.id = video.id;
  params.itag = source.tag;
  const searchParams = params.createQuery();
  let length = 0;
  await got3.get(queryURL, {
    headers: { Range: `bytes=0-0`, "User-Agent": useragent3 },
    searchParams
  }).then((res) => {
    var _a;
    if (res.headers["content-range"])
      length = parseInt((_a = res.headers["content-range"]) == null ? void 0 : _a.split("/")[1]);
  }).catch((err) => {
    if (err instanceof HTTPError3) {
      if (err.message.includes("403")) {
        throw new ContentBlockedError(
          "Not allowed to download this video! Perhaps it's from a generated channel?"
        );
      }
      if (err.message.includes("500"))
        throw new ServerError("Internal Server Error");
      else throw new APIError(err.message);
    } else throw new UnknownError(err.message);
  });
  return new Promise((resolve, reject) => {
    const stream = got3.stream(queryURL, {
      searchParams,
      headers: { "User-Agent": useragent3 },
      agent: {
        https: new https.Agent({ keepAlive: true })
      },
      http2: true
    });
    const pass = new PassThrough({
      highWaterMark: length
    });
    const result = new ReReadable();
    stream.pipe(pass).pipe(result);
    stream.on("error", (err) => {
      reject();
      if (err.message.includes("403")) {
        throw new ContentBlockedError(
          "Not allowed to download this video! Perhaps it's from a generated channel?"
        );
      } else throw new APIError(err.message);
    });
    stream.on("end", () => {
      resolve(result);
    });
  });
};
var InvidJS_default = {
  fetchInstances,
  getInstance,
  fetchVideo,
  fetchComments,
  fetchPlaylist,
  fetchChannel,
  fetchSearchSuggestions,
  searchContent,
  fetchTrending,
  fetchPopular,
  fetchHashtag,
  saveBlob,
  saveStream,
  ErrorCodes,
  FetchTypes,
  InstanceTypes,
  ContentTypes,
  TrendingTypes,
  VideoSorting,
  CommentSorting,
  InstanceSorting,
  Duration,
  DateValues,
  ChannelPlaylistsSorting,
  ChannelVideosSorting,
  AudioQuality,
  ImageQuality
};
export {
  InvidJS_default as default
};
