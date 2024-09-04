import { Stream } from 'stream';

/**
 * @name ErrorCodes
 * @description Error codes.
 */
declare enum ErrorCodes {
    MissingArgument = 10000,
    InvalidArgument = 10001,
    APIDown = 10002,
    APIError = 10003,
    ServerError = 10004,
    ContentBlocked = 10005,
    NotFound = 10006,
    UnknownError = 10007
}
/**
 * @name FetchTypes
 * @description Use this to determine how verbose you need your output to be.
 * @description Mimimal includes the title and the ID.
 * @description Basic includes the most common parameters.
 * @description Full includes all parametres of an object.
 */
declare enum FetchTypes {
    Minimal = "minimal",
    Basic = "basic",
    Full = "full"
}
/**
 * @name InstanceTypes
 * @description Lists all types of Invidious instances.
 */
declare enum InstanceTypes {
    https = "https",
    tor = "onion",
    i2p = "i2p"
}
/**
 * @name InstanceSorting
 * @description Lists all possible sorting options of Invidious instances.
 */
declare enum InstanceSorting {
    Health = "health",
    API = "api",
    Type = "type"
}
/**
 * @name ContentTypes
 * @description Lists all types of Invidious content.
 */
declare enum ContentTypes {
    Video = "video",
    Playlist = "playlist",
    Channel = "channel",
    Movie = "movie",
    Show = "show"
}
/**
 * @name TrendingTypes
 * @description Lists all types of trending content.
 */
declare enum TrendingTypes {
    Music = "music",
    Gaming = "gaming",
    News = "news",
    Movies = "movies"
}
/**
 * @name VideoSorting
 * @description Invidious search can sort the content by using one of these values.
 */
declare enum VideoSorting {
    Relevance = "relevance",
    Rating = "rating",
    UploadDate = "upload_date",
    Views = "view_count"
}
/**
 * @name VideoFeatures
 * @description Possible features of a video.
 */
declare enum VideoFeatures {
    HD = "hd",
    Subtitles = "subtitles",
    CCLicense = "creative_commons",
    Format_3D = "3d",
    Live = "live",
    Purchased = "purchased",
    Format_4K = "4k",
    Format_360 = "360",
    Location = "location",
    HDR = "hdr",
    VR = "vr180"
}
/**
 * @name CommentSorting
 * @description Invidious can sort comments by using one of these values.
 */
declare enum CommentSorting {
    Top = "top",
    New = "new"
}
/**
 * @name Duration
 * @description Invidious can search for the following video duration.
 */
declare enum Duration {
    Short = "short",
    Medium = "medium",
    Long = "long"
}
/**
 * @name DateValues
 * @description Invidious can search for the videos with the following upload dates.
 */
declare enum DateValues {
    Hour = "hour",
    Today = "today",
    Week = "week",
    Month = "month",
    Year = "year"
}
/**
 * @name ChannelVideosSorting
 * @description Invidious can sort videos on a channel by using one of these values.
 */
declare enum ChannelVideosSorting {
    Newest = "newest",
    Popular = "popular",
    Oldest = "oldest"
}
/**
 * @name ChannelPlaylistsSorting
 * @description Invidious can sort playlists on a channel by using one of these values.
 */
declare enum ChannelPlaylistsSorting {
    Newest = "newest",
    Popular = "popular",
    Last = "last"
}
/**
 * @name AudioQuality
 * @description Possible values for audio quality.
 */
declare enum AudioQuality {
    Low = "AUDIO_QUALITY_LOW",
    Medium = "AUDIO_QUALITY_MEDIUM"
}
/**
 * @name ImageQuality
 * @description Possible values for image or thumbnail quality.
 */
declare enum ImageQuality {
    HD = "maxres",
    HDDefault = "maxresdefault",
    SDDefault = "sddefault",
    High = "high",
    Medium = "medium",
    Low = "default"
}

/**
 * @name CommonOptions
 * @description Base options for all methods.
 * @param {number | undefined} limit - Amount of results to return.
 */
interface CommonOptions {
    limit?: number;
}
/**
 * @name ContentOptions
 * @description Base options for all content-related methods.
 * @param {FetchTypes | undefined} type - Type of content to return.
 */
interface ContentOptions {
    type?: FetchTypes;
}
/**
 * @name HashtagOptions
 * @description Options for hashtag searching.
 * @param {number | undefined} page - Page of the search results.
 */
interface HashtagOptions extends CommonOptions {
    page?: number;
}
/**
 * @name InstanceFetchOptions
 * @description Instance fetch filter.
 * @param {string | undefined} url - URL of the instance to search.
 * @param {InstanceTypes | "all" | undefined} type - Type of the instances to search.
 * @param {string | undefined} region - Region of the instances to search.
 * @param {boolean | "any" | undefined} api_allowed - API access value to search.
 * @param {number | undefined} health - Filter instances by health.
 * @param {InstanceSorting | undefined} sorting - Sort by...
 * @param {number | undefined} limit - Amount of instances to fetch.
 */
interface InstanceFetchOptions extends CommonOptions {
    url?: string;
    type?: InstanceTypes | "all";
    region?: string;
    api_allowed?: boolean | "any";
    health?: number | "any";
    sorting?: InstanceSorting;
}
/**
 * @name PlaylistFetchOptions
 * @description Playlist fetch filter.
 * @param {FetchTypes | undefined} type - Type of the playlist to return.
 * @param {number | undefined} limit - Amount of videos to return.
 * @param {number | undefined} page - Page of the search results.
 */
interface PlaylistFetchOptions extends CommonOptions, ContentOptions {
    page?: number;
}
/**
 * @name VideoFetchOptions
 * @description Options for fetching videos.
 * @param {string | undefined} region - Region to fetch the video as.
 * @param {FetchTypes | undefined} type - Type of the video to return.
 */
interface VideoFetchOptions extends ContentOptions {
    region?: string;
}
/**
 * @name CommentFetchOptions
 * @description Options for fetching channels.
 * @param {CommentSorting | undefined} sorting - Sort by...
 * @param {number | undefined} limit - Amount of comments to return.
 */
interface CommentFetchOptions extends CommonOptions {
    sorting?: CommentSorting;
}
/**
 * @name SearchOptions
 * @description Search engine options.
 * @param {number | undefined} page - Page of the search results.
 * @param {VideoSorting | undefined} sorting - Sort by...
 * @param {DateValues | undefined} date - Get videos by a certain date.
 * @param {Duration | undefined} duration - Duration of a video.
 * @param {ContentTypes | undefined} type - Type of the content to search.
 * @param {Enums.VideoFeatures[] | undefined} features - Comma-separated features of a video.
 * @param {string | undefined} region - Region to fetch the video as.
 * @param {number | undefined} limit - How many videos to return.
 */
interface SearchOptions extends CommonOptions {
    page?: number;
    sorting?: VideoSorting;
    date?: DateValues;
    duration?: Duration;
    type?: ContentTypes;
    features?: VideoFeatures[];
    region?: string;
}
/**
 * @name TrendingOptions
 * @description Options for fetching trending content.
 * @param {string | undefined} region - Region to fetch the video as.
 * @param {TrendingTypes | undefined} type - Type of the video to return.
 * @param {number | undefined} limit - How many videos to return.
 */
interface TrendingOptions extends CommonOptions {
    region?: string;
    type?: TrendingTypes;
}
/**
 * @name ChannelVideosOptions
 * @description Options for fetching videos on a channel.
 * @param {ChannelVideosSorting | undefined} sorting - Sort by...
 * @param {number | undefined} limit - How many videos to return.
 */
interface ChannelVideosOptions extends CommonOptions {
    sorting?: ChannelVideosSorting;
}
/**
 * @name ChannelPlaylistsOptions
 * @description Options for fetching playlists on a channel.
 * @param {ChannelPlaylistsSorting | undefined} sorting - Sort by...
 * @param {number | undefined} limit - How many playlists to return.
 */
interface ChannelPlaylistsOptions extends CommonOptions {
    sorting?: ChannelPlaylistsSorting;
}
/**
 * @name StreamOptions
 * @description Options for downloading a stream.
 * @param {number} parts - Number of parts to split the stream into.
 * @param {string | undefined} path - Path to save the stream to (current directory by default).
 */
interface StreamOptions {
    parts: number;
    path?: string;
}

/**
 * @name SoftwareStats
 * @description Statistics about software.
 *
 * @param {string} name - Name of the software (usually Invidious).
 * @param {string} version - Version of the software.
 * @param {string} branch - Cloned branch.
 */
declare class SoftwareStats {
    name: string;
    version: string;
    branch: string;
    constructor(name: string, version: string, branch: string);
}

/**
 * @name UserStats
 * @description Statistics about users.
 *
 * @param {number} total - Total users.
 * @param {number} halfYear - Users active in the last 6 months.
 * @param {number} month - Users active in the last month.
 * @param {boolean} reg_allowed - Is registration allowed?
 */
declare class UserStats {
    total: number;
    halfYear: number;
    month: number;
    reg_allowed: boolean;
    constructor(total: number, halfYear: number, month: number, reg_allowed: boolean);
}

/**
 * @name InstanceStats
 * @description Statistics about an instance.
 *
 * @param {SoftwareStats} software - Software stats.
 * @param {UserStats} users - User stats.
 */
declare class InstanceStats {
    software: SoftwareStats;
    users: UserStats;
    constructor(software: SoftwareStats, users: UserStats);
}

/**
 * @name Instance
 * @description Basic information about an instance.
 *
 * @param {string} url  - URL of the instance.
 * @param {Enums.InstanceTypes} type  - Type of the instance.
 * @param {boolean} api_allowed  - Is API allowed?
 * @param {number} [health] - Instance uptime.
 * @param {string} [region]  - Region of the instance.
 * @param {boolean} [cors_allowed]  - Is CORS allowed?
 */
declare class Instance {
    url: string;
    type: InstanceTypes;
    api_allowed: boolean;
    health?: number;
    region?: string;
    cors_allowed?: boolean;
    constructor(url: string, type: InstanceTypes, api_allowed: boolean, health?: number, region?: string, cors_allowed?: boolean);
    /**
     * @name fetchStats
     * @description Fetches stats of an instance.
     * @example await instance.fetchStats();
     * @returns {Promise<InstanceStats>} Instance stats object.
     */
    fetchStats(): Promise<InstanceStats>;
}

/**
 * @name Format
 * @description Video or audio format.
 *
 * @param {string} source - Source of the format.
 * @param {string} tag - ID of the format.
 * @param {string} type - Type of the format (codecs).
 * @param {string} container - Container of the format (mp4, webm, etc.).
 * @param {Enums.AudioQuality} [audio_quality] - Quality (audio only).
 * @param {number} [audio_sampleRate] -  Sample rate (audio only).
 * @param {number} [audio_channels] - Number of channels (audio only).
 */
declare class Format {
    source: string;
    tag: string;
    type: string;
    container: string;
    audio_quality?: AudioQuality;
    audio_sampleRate?: number;
    audio_channels?: number;
    constructor(source: string, tag: string, type: string, container: string, audio_quality?: AudioQuality, audio_sampleRate?: number, audio_channels?: number);
}

/**
 * @name Image
 * @description Image object, used for thumbnails or banners.
 *
 * @param {string} url - Image URL.
 * @param {number} width - Image width.
 * @param {number} height - Image height.
 * @param {Enums.ImageQuality} [quality] - Image quality (thumbnails only).
 */
declare class Image {
    url: string;
    width: number;
    height: number;
    quality?: ImageQuality;
    constructor(url: string, width: number, height: number, quality?: ImageQuality);
}

/**
 * @name Video
 * @description Video object. Can be Minimal, Basic or Full.
 * @param {string} title - Title of the video.
 * @param {string} id - ID of the video.
 * @param {string} url - URL of the video.
 * @param {Array<Format>} [formats] - List of available formats (basic or full only).
 * @param {number} [lengthSeconds] - Length of the video in seconds (basic or full only).
 * @param {number} [length] - Humanly-readable length of the video (basic or full only).
 * @param {string} [author] - Author username. (full only).
 * @param {string} [author_id] - Author ID. (full only).
 * @param {string} [description] - Description of the video (full only).
 * @param {string} [date] - Date of publishing (full only).
 * @param {number} [views] - Number of views (full only).
 * @param {number} [likes] - Number of likes (full only).
 * @param {number} [dislikes] - Number of dislikes (full only).
 * @param {Array<Image>} [thumbnails] - Video thumbnails (full only).
 */
declare class Video {
    title: string;
    id: string;
    url: string;
    formats?: Array<Format>;
    lengthSeconds?: number;
    length?: string;
    author?: string;
    author_id?: string;
    description?: string;
    date?: string;
    views?: number;
    likes?: number;
    dislikes?: number;
    thumbnails?: Array<Image>;
    constructor(title: string, id: string, url: string, formats?: Array<Format>, lengthSeconds?: number, length?: string, author?: string, author_id?: string, description?: string, date?: string, views?: number, likes?: number, dislikes?: number, thumbnails?: Array<Image>);
}

/**
 * @name Playlist
 * @description Playlist object. Can be Minimal, Basic or Full.
 *
 * @param {string} title - Title of the playlist.
 * @param {string} id - ID of the playlist.
 * @param {string} url - URL of the playlist.
 * @param {Array<Video>} [videos] - Videos in the playlist (basic or full only).
 * @param {number} [videoCount] - Number of videos in the playlist (basic or full only).
 * @param {string} [author] - Author username (full only).
 * @param {string} [author_id] - Author ID (full only).
 * @param {string} [description] - Description of the playlist (full only).
 * @param {Image} [thumbnail] - Thumbnail of the playlist (full only).
 */
declare class Playlist {
    title: string;
    id: string;
    url: string;
    videos?: Array<Video>;
    videoCount?: number;
    author?: string;
    author_id?: string;
    description?: string;
    thumbnail?: Image;
    constructor(title: string, id: string, url: string, videos?: Array<Video>, videoCount?: number, author?: string, author_id?: string, description?: string, thumbnail?: Image);
}

/**
 * @name Channel
 * @description Channel object. Can be Minimal, Basic or Full.
 * @param {string} name - Channel name.
 * @param {string} id - Channel ID.
 * @param {number} [subs] - Number of subscribers (basic or full only).
 * @param {string} [description] - Channel description (full only).
 * @param {number} [views] - Number of views (full only).
 * @param {boolean} [isVerified] - Is channel verified? (full only)
 * @param {Array<Video>} [latest_videos] - Latest videos (full only).
 */
declare class Channel {
    name: string;
    id: string;
    subs?: number;
    description?: string;
    views?: number;
    isVerified?: boolean;
    latest_videos?: Array<Video>;
    constructor(name: string, id: string, subs?: number, description?: string, views?: number, isVerified?: boolean, latest_videos?: Array<Video>);
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
    fetchRelatedChannels: (instance: Instance, opts?: CommonOptions) => Promise<Array<Channel>>;
    /**
     * @name fetchChannelPlaylists
     * @description Fetches latest channel playlists.
     * @param {Instance} instance - Instance to fetch data from.
     * @param {ChannelPlaylistsOptions} [opts] -  Playlist fetch options.
     * @example await channel.fetchChannelPlaylists(instance);
     * @example await channel.fetchChannelPlaylists(instance, {limit: 3});
     * @returns {Promise<Array<Playlist>>} Array of channel playlists.
     */
    fetchChannelPlaylists: (instance: Instance, opts?: ChannelPlaylistsOptions) => Promise<Array<Playlist>>;
    /**
     * @name fetchChannelVideos
     * @description Fetches latest channel videos.
     * @param {Instance} instance - Instance to fetch data from.
     * @param {ChannelVideosOptions} [opts] - Video fetch options.
     * @example await channel.fetchChannelVideos(instance);
     * @example await channel.fetchChannelVideos(instance, {limit: 7});
     * @returns {Promise<Array<Video>>} Array of channel videos.
     */
    fetchChannelVideos: (instance: Instance, opts?: ChannelVideosOptions) => Promise<Array<Video>>;
}

/**
 * @name Comment
 * @description Comment object.
 *
 * @param {string} author - Author username.
 * @param {string} author_id - Author ID.
 * @param {string} text - Comment text.
 */
declare class Comment {
    author: string;
    author_id: string;
    text: string;
    constructor(author: string, author_id: string, text: string);
}

declare const _default: {
    fetchInstances: (opts?: InstanceFetchOptions) => Promise<Instance[]>;
    getInstance: (url: string) => Promise<Instance>;
    fetchVideo: (instance: Instance, id: string, opts?: VideoFetchOptions) => Promise<Video>;
    fetchComments: (instance: Instance, video: Video, opts?: CommentFetchOptions) => Promise<Comment[]>;
    fetchPlaylist: (instance: Instance, id: string, opts?: PlaylistFetchOptions) => Promise<Playlist>;
    fetchChannel: (instance: Instance, id: string, opts?: ContentOptions) => Promise<Channel>;
    fetchSearchSuggestions: (instance: Instance, query: string) => Promise<Array<string>>;
    searchContent: (instance: Instance, query: string, opts?: SearchOptions) => Promise<Array<Channel | Playlist | Video>>;
    fetchTrending: (instance: Instance, opts?: TrendingOptions) => Promise<Array<Video>>;
    fetchPopular: (instance: Instance, opts?: CommonOptions) => Promise<Array<Video>>;
    fetchHashtag: (instance: Instance, tag: string, opts?: HashtagOptions) => Promise<Array<Video>>;
    saveBlob: (instance: Instance, video: Video, source: Format, opts?: StreamOptions, local?: boolean) => Promise<Blob>;
    saveStream: (instance: Instance, video: Video, source: Format, local?: boolean) => Promise<Stream>;
    ErrorCodes: typeof ErrorCodes;
    FetchTypes: typeof FetchTypes;
    InstanceTypes: typeof InstanceTypes;
    ContentTypes: typeof ContentTypes;
    TrendingTypes: typeof TrendingTypes;
    VideoSorting: typeof VideoSorting;
    CommentSorting: typeof CommentSorting;
    InstanceSorting: typeof InstanceSorting;
    Duration: typeof Duration;
    DateValues: typeof DateValues;
    ChannelPlaylistsSorting: typeof ChannelPlaylistsSorting;
    ChannelVideosSorting: typeof ChannelVideosSorting;
    AudioQuality: typeof AudioQuality;
    ImageQuality: typeof ImageQuality;
};

export { _default as default };
