import GroupsCollection from './Groups';
import UsersCollection from './Users';
import TemplatesCollection from './Templates';
import ProjectsCollection from './Projects';
import ServersCollection from './Servers';
import VariablesCollection from './Variables';
import SharedFilesCollection from './SharedFiles';
import ConfigFilesCollection from './ConfigFiles';
import NotificationsCollection from './Notifications';
import HeartbeatsCollection from './Heartbeats';
import CheckUrlsCollection from './CheckUrls';
import CommandsColleciton from './Commands';
import DeploymentsCollection from './Deployments';

export default {
  Groups: GroupsCollection,
  Users: UsersCollection,
  Templates: TemplatesCollection,
  Projects: ProjectsCollection,
  Servers: ServersCollection,
  Variables: VariablesCollection,
  SharedFiles: SharedFilesCollection,
  ConfigFiles: ConfigFilesCollection,
  Notifications: NotificationsCollection,
  Heartbeats: HeartbeatsCollection,
  CheckUrls: CheckUrlsCollection,
  Commands: CommandsColleciton,
  Deployment: DeploymentsCollection // FIXME: Should rename this, slightly misleading
};
