import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'ダッシュボード',
    icon: 'nb-home',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title: 'ユーザー管理',
    icon: 'nb-person',
    children: [
      {
        title: '新しいユーザー',
        link: '/pages/users/new-user',
      },
      {
        title: 'ユーザーを一覧表示する',
        link: '/pages/users/list-users',
      },
    ],
  },
  {
    title: 'グループ管理',
    icon: 'nb-tables',
    children: [
      {
        title: '新しいグループユーザー',
        link: '/pages/groups/new-group',
      },
      {
        title: 'リストグループ',
        link: '/pages/groups/list-groups',
      },
    ],
  },
  {
    title: 'ルーム管理',
    icon: 'nb-grid-a-outline',
    children: [
      {
        title: '新しい部屋',
        link: '/pages/rooms/new-room',
      },
      {
        title: 'リストルーム',
        link: '/pages/rooms/list-rooms',
      },
    ],
  },
  {
    title: 'ボックス管理',
    icon: 'nb-e-commerce',
    children: [
      {
        title: '新しいボックス',
        link: '/pages/boxs/new-box',
      },
      {
        title: 'リストボックス',
        link: '/pages/boxs/list-boxs',
      },
    ],
  },
  {
    title: 'マーカー管理',
    icon: 'nb-location',
    children: [
      {
        title: '新しいマーカー',
        link: '/pages/markers/new-box',
      },
      {
        title: 'リストマーカー',
        link: '/pages/markers/list-markers',
      },
    ],
  },
  {
    title: 'フォルダ管理',
    icon: 'nb-audio',
    children: [
      {
        title: '新しいフォルダ',
        link: '/pages/folders/new-folder',
      },
      {
        title: 'リストフォルダ',
        link: '/pages/folders/list-folders',
      },
    ],
  },
  {
    title: 'ファイル管理',
    icon: 'nb-compose',
    children: [
      {
        title: '新しいファイル',
        link: '/pages/files/new-file',
      },
      {
        title: 'リストファイル',
        link: '/pages/files/list-files',
      },
    ],
  },
  <% _.each(entities, function(entity) { %>
  {
    title: '<%= _s.classify(entity.name)%>',
    icon: 'nb-compose',
    children: [
      {
        title: 'New <%= _.lowerCase(entity.name) %>',
        link: '/pages/<%= _.lowerCase(entity.name) %>/new-<%= _.lowerCase(entity.name) %>',
      },
      {
        title: 'List <%= _.lowerCase(entity.name) %>',
        link: '/pages/<%= _.lowerCase(entity.name) %>/list-<%= _.lowerCase(entity.name) %>',
      },
    ],
  }, <% }); %>
      {
        title: 'Auth',
        icon: 'nb-locked',
        children: [
          {
            title: 'Login',
            link: '/auth/login',
          },
          {
            title: 'Register',
            link: '/auth/register',
          },
          {
            title: 'Request Password',
            link: '/auth/request-password',
          },
          {
            title: 'Reset Password',
            link: '/auth/reset-password',
          },
        ],
      },
];
