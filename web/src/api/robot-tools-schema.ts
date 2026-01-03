/* eslint-disable */
/**
 * This file was automatically generated from mcp/schema.yaml
 * DO NOT MODIFY IT BY HAND. Run: node mcp/generate-ts.js
 */

/**
 * List of all available tools with their names and descriptions
 */
export type ToolRobotGetAllToolNamesOutput = ToolInfo[];

export interface MCPTools {
  ToolSearch?: Search;
  ToolSearchInput?: ToolSearchInput;
  ToolSearchOutput?: ToolSearchOutput;
  SearchedItem?: SearchedItem;
  ToolRobotSwitch?: RobotSwitch;
  ToolRobotSwitchInput?: ToolRobotSwitchInput;
  ToolRobotSwitchOutput?: ToolRobotSwitchOutput;
  ToolRobotGetAllToolNames?: SystemAllToolNames;
  ToolRobotGetAllToolNamesInput?: ToolRobotGetAllToolNamesInput;
  ToolRobotGetAllToolNamesOutput?: ToolRobotGetAllToolNamesOutput;
  ToolInfo?: ToolInfo;
  ToolRobotCreate?: RobotCreate;
  ToolRobotCreateInput?: ToolRobotCreateInput;
  ToolRobotCreateOutput?: ToolRobotCreateOutput;
  ToolRobotList?: RobotList;
  ToolRobotListInput?: ToolRobotListInput;
  ToolRobotListOutput?: ToolRobotListOutput;
  RobotItem?: RobotItem;
  ToolRobotGet?: RobotGet;
  ToolRobotGetInput?: ToolRobotGetInput;
  ToolRobotGetOutput?: ToolRobotGetOutput;
  ToolRobotUpdate?: RobotUpdate;
  ToolRobotUpdateInput?: ToolRobotUpdateInput;
  ToolRobotUpdateOutput?: ToolRobotUpdateOutput;
  ToolRobotDelete?: RobotDelete;
  ToolRobotDeleteInput?: ToolRobotDeleteInput;
  ToolRobotDeleteOutput?: ToolRobotDeleteOutput;
  ToolLibraryPageTree?: LibraryPageList;
  ToolLibraryPageTreeInput?: ToolLibraryPageTreeInput;
  ToolLibraryPageTreeOutput?: ToolLibraryPageTreeOutput;
  LibraryPageTreeNode?: LibraryPageTreeNode;
  ToolLibraryPageGet?: GetLibraryPage;
  ToolLibraryPageGetInput?: ToolLibraryPageGetInput;
  ToolLibraryPageGetOutput?: ToolLibraryPageGetOutput;
  ToolLibraryPageCreate?: CreateLibraryPage;
  ToolLibraryPageCreateInput?: ToolLibraryPageCreateInput;
  ToolLibraryPageCreateOutput?: ToolLibraryPageCreateOutput;
  ToolLibraryPageUpdate?: UpdateLibraryPage;
  ToolLibraryPageUpdateInput?: ToolLibraryPageUpdateInput;
  ToolLibraryPageUpdateOutput?: ToolLibraryPageUpdateOutput;
  ToolLibraryPageSearch?: SearchLibraryPages;
  ToolLibraryPageSearchInput?: ToolLibraryPageSearchInput;
  ToolLibraryPageSearchOutput?: ToolLibraryPageSearchOutput;
  LibraryPageSearchItem?: LibraryPageSearchItem;
  ToolTagList?: TagList;
  ToolTagListInput?: ToolTagListInput;
  ToolTagListOutput?: ToolTagListOutput;
  TagItem?: TagItem;
  ToolLinkCreate?: LinkCreate;
  ToolLinkCreateInput?: ToolLinkCreateInput;
  ToolLinkCreateOutput?: ToolLinkCreateOutput;
  ToolThreadCreate?: ThreadCreate;
  ToolThreadCreateInput?: ToolThreadCreateInput;
  ToolThreadCreateOutput?: ToolThreadCreateOutput;
  ToolThreadList?: ThreadList;
  ToolThreadListInput?: ToolThreadListInput;
  ToolThreadListOutput?: ToolThreadListOutput;
  ThreadSummary?: ThreadSummary;
  ToolThreadGet?: ThreadGet;
  ToolThreadGetInput?: ToolThreadGetInput;
  ToolThreadGetOutput?: ToolThreadGetOutput;
  ToolThreadUpdate?: ThreadUpdate;
  ToolThreadUpdateInput?: ToolThreadUpdateInput;
  ToolThreadUpdateOutput?: ToolThreadUpdateOutput;
  ToolThreadReply?: ThreadReply;
  ToolThreadReplyInput?: ToolThreadReplyInput;
  ToolThreadReplyOutput?: ToolThreadReplyOutput;
  ToolCategoryList?: CategoryList;
  ToolCategoryListInput?: ToolCategoryListInput;
  ToolCategoryListOutput?: ToolCategoryListOutput;
  CategoryItem?: CategoryItem;
  DatagraphItemRef?: DatagraphItemRef;
  RobotChatContext?: RobotChatContext;
  [k: string]: unknown;
}
/**
 * Search the Storyden knowledge base for library pages, forum threads, and other content. Returns relevant results matching the query.
 */
export interface Search {
  input: ToolSearchInput;
  output: ToolSearchOutput;
  [k: string]: unknown;
}
export interface ToolSearchInput {
  /**
   * The search query text
   */
  query: string;
  /**
   * Filter by content types.
   */
  kind?: ("post" | "thread" | "reply" | "node" | "collection" | "profile" | "event")[];
  /**
   * Filter by author handles (usernames). Author handles that don't exist will be reported in the error message while still searching with valid authors. Do not use '@' prefix.
   */
  authors?: string[];
  /**
   * Filter by category names (for forum threads). Category names are case-insensitive. Categories that don't exist will be reported in the error message while still searching with valid categories.
   */
  categories?: string[];
  /**
   * Filter by tag names. Tags are case-sensitive.
   */
  tags?: string[];
  /**
   * Maximum number of results to return (default 10, max 100)
   */
  max_results?: number;
}
export interface ToolSearchOutput {
  /**
   * Total number of results found
   */
  results: number;
  /**
   * List of search results
   */
  items: SearchedItem[];
}
export interface SearchedItem {
  /**
   * Unique identifier
   */
  id: string;
  /**
   * Type of content
   */
  kind: string;
  /**
   * URL friendly identifier
   */
  slug: string;
  /**
   * Title or name
   */
  name: string;
  /**
   * Brief description or excerpt
   */
  description?: string;
}
/**
 * Switch the current conversation to a different Robot (agent). Use this when the user wants to talk to a different specialized agent or when a different agent would be better suited to help with the user's request.
 */
export interface RobotSwitch {
  input: ToolRobotSwitchInput;
  output: ToolRobotSwitchOutput;
  [k: string]: unknown;
}
export interface ToolRobotSwitchInput {
  /**
   * The ID of the Robot (agent) to switch to. Must be a valid XID format (20 character alphanumeric string). Use robot_list to see available Robot IDs.
   */
  robot_id: string;
}
export interface ToolRobotSwitchOutput {
  /**
   * Whether the agent switch was successful
   */
  success: boolean;
  /**
   * The ID of the robot that was switched to
   */
  robot_id: string;
}
/**
 * Get a list of all available tool names and their descriptions. This is useful when creating or updating a Robot to know what tools are available without loading full schemas. Returns a lightweight list of tool names and brief descriptions.
 */
export interface SystemAllToolNames {
  input: ToolRobotGetAllToolNamesInput;
  output: ToolRobotGetAllToolNamesOutput;
  [k: string]: unknown;
}
export interface ToolRobotGetAllToolNamesInput {}
export interface ToolInfo {
  /**
   * The tool name identifier
   */
  name: string;
  /**
   * Brief description of what the tool does
   */
  description: string;
}
/**
 * Create a new Robot (agent) with a specific purpose and behavior. Robots are customizable automations that can help users with specific workflows using tailored tools and instructions.
 */
export interface RobotCreate {
  input: ToolRobotCreateInput;
  output: ToolRobotCreateOutput;
  [k: string]: unknown;
}
export interface ToolRobotCreateInput {
  /**
   * The name of the Robot - should be descriptive and help identify its purpose
   */
  name: string;
  /**
   * Optional human-readable description of the Robot's purpose and capabilities
   */
  description: string;
  /**
   * The directive/system prompt that defines how the Robot behaves, what it helps with, and its personality. This is the primary instruction that guides the Robot's behavior.
   */
  playbook: string;
  /**
   * List of tool names that the Robot can use.
   */
  tools?: string[];
}
export interface ToolRobotCreateOutput {
  /**
   * The unique identifier of the created Robot
   */
  id: string;
  /**
   * The name of the Robot
   */
  name: string;
}
/**
 * List all available Robots. Use this to see what Robots have been created and what they do.
 */
export interface RobotList {
  input: ToolRobotListInput;
  output: ToolRobotListOutput;
  [k: string]: unknown;
}
export interface ToolRobotListInput {
  /**
   * Maximum number of Robots to return (default 20)
   */
  limit?: number;
}
export interface ToolRobotListOutput {
  /**
   * List of Robots
   */
  robots: RobotItem[];
  /**
   * Total number of Robots found
   */
  total: number;
}
export interface RobotItem {
  /**
   * Unique identifier
   */
  id: string;
  /**
   * Robot name
   */
  name: string;
  /**
   * Human-readable description of the Robot's purpose
   */
  description?: string;
}
/**
 * Get details of a specific Robot by its ID. Use this to view the full configuration of a Robot.
 */
export interface RobotGet {
  input: ToolRobotGetInput;
  output: ToolRobotGetOutput;
  [k: string]: unknown;
}
export interface ToolRobotGetInput {
  /**
   * The unique identifier of the Robot to retrieve. Must be a valid XID format (20 character alphanumeric string). Example: cq3pqt0q91s73dq8r000
   */
  id: string;
}
export interface ToolRobotGetOutput {
  /**
   * The unique identifier of the Robot
   */
  id: string;
  /**
   * The name of the Robot
   */
  name: string;
  /**
   * Human-readable description of the Robot's purpose
   */
  description?: string;
  /**
   * The Robot's directive
   */
  playbook: string;
  /**
   * List of tool names that the Robot can use
   */
  tools: string[];
}
/**
 * Update a Robot's configuration. You can modify its name, description, playbook (directive), or tools. Only provide the fields you want to change.
 */
export interface RobotUpdate {
  input: ToolRobotUpdateInput;
  output: ToolRobotUpdateOutput;
  [k: string]: unknown;
}
export interface ToolRobotUpdateInput {
  /**
   * The unique identifier of the Robot to update. Must be a valid XID format (20 character alphanumeric string).
   */
  id: string;
  /**
   * The new name for the Robot
   */
  name?: string;
  /**
   * The new description for the Robot
   */
  description?: string;
  /**
   * The new directive/system prompt for the Robot
   */
  playbook?: string;
  /**
   * The new list of tool names that the Robot can use.
   */
  tools?: string[];
}
export interface ToolRobotUpdateOutput {
  /**
   * The unique identifier of the updated Robot
   */
  id: string;
  /**
   * The Robot's name
   */
  name: string;
}
/**
 * Delete a Robot permanently.
 */
export interface RobotDelete {
  input: ToolRobotDeleteInput;
  output: ToolRobotDeleteOutput;
  [k: string]: unknown;
}
export interface ToolRobotDeleteInput {
  /**
   * The unique identifier of the Robot to delete. Must be a valid XID format (20 character alphanumeric string).
   */
  id: string;
}
export interface ToolRobotDeleteOutput {
  /**
   * Whether the deletion was successful
   */
  success: boolean;
  /**
   * The ID of the deleted Robot
   */
  id: string;
}
/**
 * Get the full tree structure of pages in the library. Returns a hierarchical view of all wiki pages showing their parent-child relationships.
 */
export interface LibraryPageList {
  input: ToolLibraryPageTreeInput;
  output: ToolLibraryPageTreeOutput;
  [k: string]: unknown;
}
export interface ToolLibraryPageTreeInput {
  /**
   * Maximum depth to traverse (-1 for unlimited, 0 for root only, 1 for root + children, etc.)
   */
  depth?: number;
}
export interface ToolLibraryPageTreeOutput {
  /**
   * List of pages in tree structure
   */
  pages: LibraryPageTreeNode[];
}
export interface LibraryPageTreeNode {
  /**
   * URL-friendly identifier for the page
   */
  slug: string;
  /**
   * Display name of the page
   */
  name: string;
  /**
   * Brief description of the page
   */
  description: string;
  /**
   * Slug of the parent page (omitted for root pages)
   */
  parent?: string;
  /**
   * Tags associated with this page
   */
  tags?: string[];
}
/**
 * Get detailed information about a specific library page by its slug.
 */
export interface GetLibraryPage {
  input: ToolLibraryPageGetInput;
  output: ToolLibraryPageGetOutput;
  [k: string]: unknown;
}
export interface ToolLibraryPageGetInput {
  /**
   * The unique identifier of the library page to retrieve
   */
  id: string;
}
export interface ToolLibraryPageGetOutput {
  /**
   * URL-friendly identifier for the page
   */
  slug: string;
  /**
   * Display name of the page
   */
  name: string;
  /**
   * Brief description of the page
   */
  description?: string;
  /**
   * Tags associated with this page
   */
  tags: string[];
  /**
   * Slugs of child pages
   */
  child_pages: string[];
}
/**
 * Create a new page in the library. A slug will be generated automatically if not provided.
 */
export interface CreateLibraryPage {
  input: ToolLibraryPageCreateInput;
  output: ToolLibraryPageCreateOutput;
  [k: string]: unknown;
}
export interface ToolLibraryPageCreateInput {
  /**
   * The name/title of the page
   */
  name: string;
  /**
   * The unique slug for this page. If not provided, one will be generated from the name.
   */
  slug?: string;
  /**
   * The content of the page in HTML format
   */
  content?: string;
  /**
   * Slug of the parent page. Only include if you already have a parent slug available. Leave empty to create a root-level page.
   */
  parent?: string;
  /**
   * Visibility of the page (default: published)
   */
  visibility?: "published" | "draft";
  /**
   * Optional external URL if this page references a topic on another website
   */
  url?: string;
}
export interface ToolLibraryPageCreateOutput {
  /**
   * The slug of the created page
   */
  slug: string;
  /**
   * The name of the created page
   */
  name: string;
}
/**
 * Update an existing page in the library. Only provide the fields you want to change.
 */
export interface UpdateLibraryPage {
  input: ToolLibraryPageUpdateInput;
  output: ToolLibraryPageUpdateOutput;
  [k: string]: unknown;
}
export interface ToolLibraryPageUpdateInput {
  /**
   * The unique identifier of the page to update
   */
  id: string;
  /**
   * The new name/title of the page
   */
  name?: string;
  /**
   * The new content of the page in HTML format
   */
  content?: string;
  /**
   * New visibility of the page
   */
  visibility?: "published" | "draft";
  /**
   * New external URL reference
   */
  url?: string;
  /**
   * New parent page slug. Provide to move the page to a different parent.
   */
  parent?: string;
}
export interface ToolLibraryPageUpdateOutput {
  /**
   * The slug of the updated page
   */
  slug: string;
  /**
   * The name of the updated page
   */
  name: string;
}
/**
 * Search for pages in the library wiki. Returns matching pages based on the search query.
 */
export interface SearchLibraryPages {
  input: ToolLibraryPageSearchInput;
  output: ToolLibraryPageSearchOutput;
  [k: string]: unknown;
}
export interface ToolLibraryPageSearchInput {
  /**
   * The search query text
   */
  query: string;
}
export interface ToolLibraryPageSearchOutput {
  /**
   * Total number of results found
   */
  results: number;
  /**
   * List of matching library pages
   */
  items: LibraryPageSearchItem[];
}
export interface LibraryPageSearchItem {
  /**
   * URL-friendly identifier
   */
  slug: string;
  /**
   * Page name/title
   */
  name: string;
  /**
   * Brief description
   */
  description?: string;
  /**
   * Page content excerpt
   */
  content?: string;
}
/**
 * Get a list of all tags on the site or search for tags by name. Tags are labels used to categorize and organize content. Each tag includes its name and the number of items tagged with it.
 */
export interface TagList {
  input: ToolTagListInput;
  output: ToolTagListOutput;
  [k: string]: unknown;
}
export interface ToolTagListInput {
  /**
   * Optional search query to filter tags by name. If not provided, returns all tags.
   */
  query?: string;
}
export interface ToolTagListOutput {
  /**
   * List of tags
   */
  tags: TagItem[];
}
export interface TagItem {
  /**
   * The tag name
   */
  name: string;
  /**
   * Number of items tagged with this tag
   */
  item_count: number;
}
/**
 * Create or update a link in the shared bookmarks list. Fetches the URL and extracts OpenGraph metadata (title, description) and plain text content. Useful for bookmarking websites, articles, or any web content.
 */
export interface LinkCreate {
  input: ToolLinkCreateInput;
  output: ToolLinkCreateOutput;
  [k: string]: unknown;
}
export interface ToolLinkCreateInput {
  /**
   * The URL to create a bookmark for. Must be a valid HTTP/HTTPS URL.
   */
  url: string;
}
export interface ToolLinkCreateOutput {
  /**
   * Unique identifier for the link
   */
  slug: string;
  /**
   * The bookmarked URL
   */
  url: string;
  /**
   * Title extracted from OpenGraph metadata
   */
  opengraph_title?: string;
  /**
   * Description extracted from OpenGraph metadata
   */
  opengraph_description?: string;
  /**
   * Plain text content extracted from the page
   */
  plain_text?: string;
}
/**
 * Create a new discussion thread in the forum. Threads are discussions organized by category with tags for better discovery.
 */
export interface ThreadCreate {
  input: ToolThreadCreateInput;
  output: ToolThreadCreateOutput;
  [k: string]: unknown;
}
export interface ToolThreadCreateInput {
  /**
   * The title of the thread
   */
  title: string;
  /**
   * The content of the thread in HTML format
   */
  body: string;
  /**
   * The category slug for the thread. Use category_list to see available categories.
   */
  category: string;
  /**
   * Thread visibility (default: published)
   */
  visibility?: "published" | "draft";
  /**
   * Optional URL if this thread is about a specific link
   */
  url?: string;
  /**
   * Optional tags for the thread
   */
  tags?: string[];
}
export interface ToolThreadCreateOutput {
  /**
   * The thread slug
   */
  slug: string;
  /**
   * The thread title
   */
  title: string;
  /**
   * Creation timestamp
   */
  created_at?: string;
  /**
   * Thread content as plain text
   */
  content?: string;
  /**
   * Thread visibility
   */
  visibility?: string;
  /**
   * Author handle
   */
  author?: string;
  /**
   * Category name
   */
  category?: string;
  tags?: string[];
  /**
   * Associated URL if present
   */
  url?: string;
}
/**
 * List and search discussion threads with filtering and pagination.
 */
export interface ThreadList {
  input: ToolThreadListInput;
  output: ToolThreadListOutput;
  [k: string]: unknown;
}
export interface ToolThreadListInput {
  /**
   * Search query to filter threads
   */
  query?: string;
  /**
   * Filter by visibility
   */
  visibility?: "draft" | "published";
  /**
   * Page number (default: 1)
   */
  page?: number;
}
export interface ToolThreadListOutput {
  threads: ThreadSummary[];
  current_page: number;
  total_pages: number;
  total_results: number;
  /**
   * Next page number if available
   */
  next_page?: number;
}
export interface ThreadSummary {
  slug: string;
  title: string;
  /**
   * Short excerpt of the thread
   */
  excerpt: string;
  /**
   * Author handle
   */
  author: string;
  /**
   * Category name
   */
  category: string;
}
/**
 * Get a specific thread with its content. Returns the thread details including author, content, and category information.
 */
export interface ThreadGet {
  input: ToolThreadGetInput;
  output: ToolThreadGetOutput;
  [k: string]: unknown;
}
export interface ToolThreadGetInput {
  /**
   * The unique identifier of the thread to retrieve
   */
  id: string;
  /**
   * Page number for replies (default: 1)
   */
  page?: number;
}
export interface ToolThreadGetOutput {
  slug: string;
  title: string;
  /**
   * Thread content as plain text
   */
  content: string;
  visibility: string;
  /**
   * Author handle
   */
  author: string;
  /**
   * Category name
   */
  category: string;
  tags: string[];
  /**
   * Creation timestamp
   */
  created_at: string;
  /**
   * Associated URL if present
   */
  url?: string;
}
/**
 * Update an existing thread's properties
 */
export interface ThreadUpdate {
  input: ToolThreadUpdateInput;
  output: ToolThreadUpdateOutput;
  [k: string]: unknown;
}
export interface ToolThreadUpdateInput {
  /**
   * The unique identifier of the thread to update
   */
  id: string;
  /**
   * New title for the thread
   */
  title?: string;
  /**
   * New content for the thread in HTML format
   */
  body?: string;
  /**
   * New visibility: published or draft
   */
  visibility?: "published" | "draft";
  /**
   * New tags for the thread
   */
  tags?: string[];
}
export interface ToolThreadUpdateOutput {
  /**
   * The thread slug
   */
  slug: string;
  /**
   * The thread title
   */
  title: string;
  /**
   * Creation timestamp
   */
  created_at?: string;
  /**
   * Thread content as plain text
   */
  content?: string;
  /**
   * Thread visibility
   */
  visibility?: string;
  /**
   * Author handle
   */
  author?: string;
  /**
   * Category name
   */
  category?: string;
  tags?: string[];
  /**
   * Associated URL if present
   */
  url?: string;
}
/**
 * Add a reply to an existing thread
 */
export interface ThreadReply {
  input: ToolThreadReplyInput;
  output: ToolThreadReplyOutput;
  [k: string]: unknown;
}
export interface ToolThreadReplyInput {
  /**
   * The unique identifier of the thread to reply to
   */
  id: string;
  /**
   * The reply content in HTML format
   */
  body: string;
}
export interface ToolThreadReplyOutput {
  /**
   * Author handle
   */
  author: string;
  /**
   * Reply content as plain text
   */
  content: string;
  /**
   * Creation timestamp
   */
  created_at: string;
  /**
   * Update timestamp
   */
  updated_at: string;
}
/**
 * List all thread categories with their names and descriptions
 */
export interface CategoryList {
  input: ToolCategoryListInput;
  output: ToolCategoryListOutput;
  [k: string]: unknown;
}
export interface ToolCategoryListInput {}
export interface ToolCategoryListOutput {
  categories: CategoryItem[];
}
export interface CategoryItem {
  /**
   * Category slug
   */
  slug: string;
  /**
   * Category name
   */
  name: string;
  /**
   * Category description
   */
  description?: string;
}
export interface DatagraphItemRef {
  /**
   * Unique identifier of the datagraph item
   */
  id: string;
  /**
   * URL-friendly slug of the datagraph item
   */
  slug: string;
  /**
   * Type of datagraph item (thread, node, profile, collection, etc.)
   */
  kind: "post" | "thread" | "reply" | "node" | "collection" | "profile" | "event";
}
export interface RobotChatContext {
  datagraph_item?: DatagraphItemRef1;
  /**
   * Human-readable page type if not viewing a specific datagraph item. Examples: 'Index page', 'Settings page', 'Admin page', 'Search page'. This is free-form text since the backend doesn't know about frontend routes.
   */
  page_type?: string;
}
/**
 * Optional reference to a datagraph item if the user is viewing one (e.g., a thread, library page, profile)
 */
export interface DatagraphItemRef1 {
  /**
   * Unique identifier of the datagraph item
   */
  id: string;
  /**
   * URL-friendly slug of the datagraph item
   */
  slug: string;
  /**
   * Type of datagraph item (thread, node, profile, collection, etc.)
   */
  kind: "post" | "thread" | "reply" | "node" | "collection" | "profile" | "event";
}

export type ToolName = "search" | "robot_switch" | "system_all_tool_names" | "robot_create" | "robot_list" | "robot_get" | "robot_update" | "robot_delete" | "library_page_list" | "get_library_page" | "create_library_page" | "update_library_page" | "search_library_pages" | "tag_list" | "link_create" | "thread_create" | "thread_list" | "thread_get" | "thread_update" | "thread_reply" | "category_list";

export const TOOL_NAMES = ["search", "robot_switch", "system_all_tool_names", "robot_create", "robot_list", "robot_get", "robot_update", "robot_delete", "library_page_list", "get_library_page", "create_library_page", "update_library_page", "search_library_pages", "tag_list", "link_create", "thread_create", "thread_list", "thread_get", "thread_update", "thread_reply", "category_list"] as const;

export type ToolInputMap = {
  "search": ToolSearchInput;
  "robot_switch": ToolRobotSwitchInput;
  "system_all_tool_names": ToolRobotGetAllToolNamesInput;
  "robot_create": ToolRobotCreateInput;
  "robot_list": ToolRobotListInput;
  "robot_get": ToolRobotGetInput;
  "robot_update": ToolRobotUpdateInput;
  "robot_delete": ToolRobotDeleteInput;
  "library_page_list": ToolLibraryPageTreeInput;
  "get_library_page": ToolLibraryPageGetInput;
  "create_library_page": ToolLibraryPageCreateInput;
  "update_library_page": ToolLibraryPageUpdateInput;
  "search_library_pages": ToolLibraryPageSearchInput;
  "tag_list": ToolTagListInput;
  "link_create": ToolLinkCreateInput;
  "thread_create": ToolThreadCreateInput;
  "thread_list": ToolThreadListInput;
  "thread_get": ToolThreadGetInput;
  "thread_update": ToolThreadUpdateInput;
  "thread_reply": ToolThreadReplyInput;
  "category_list": ToolCategoryListInput;
};

export type ToolOutputMap = {
  "search": ToolSearchOutput;
  "robot_switch": ToolRobotSwitchOutput;
  "system_all_tool_names": ToolRobotGetAllToolNamesOutput;
  "robot_create": ToolRobotCreateOutput;
  "robot_list": ToolRobotListOutput;
  "robot_get": ToolRobotGetOutput;
  "robot_update": ToolRobotUpdateOutput;
  "robot_delete": ToolRobotDeleteOutput;
  "library_page_list": ToolLibraryPageTreeOutput;
  "get_library_page": ToolLibraryPageGetOutput;
  "create_library_page": ToolLibraryPageCreateOutput;
  "update_library_page": ToolLibraryPageUpdateOutput;
  "search_library_pages": ToolLibraryPageSearchOutput;
  "tag_list": ToolTagListOutput;
  "link_create": ToolLinkCreateOutput;
  "thread_create": ToolThreadCreateOutput;
  "thread_list": ToolThreadListOutput;
  "thread_get": ToolThreadGetOutput;
  "thread_update": ToolThreadUpdateOutput;
  "thread_reply": ToolThreadReplyOutput;
  "category_list": ToolCategoryListOutput;
};
