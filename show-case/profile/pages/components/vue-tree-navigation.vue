<template>
  <div id="components_vue-tree-navigation">
    <vue-tree-navigation :items="items" :defaultOpenLevel="1" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [{
          name: 'Introduction',
          route: 'introduction',
          children: [{
            name: 'Features',
            element: 'features'
          },
            {
              name: 'Requirements',
              element: 'requirements'
            },
            {
              name: 'Demo',
              element: 'demo'
            }
          ]
        },
          {
            name: 'Installation',
            route: 'installation'
          },
          {
            name: 'Usage',
            route: 'usage',
            children: [{
              name: 'Props',
              element: 'props',
              children: [{
                name: 'items',
                element: 'items'
              },
                {
                  name: 'defaultOpenLevel',
                  element: 'default-open-level'
                }
              ]
            }, {
              name: 'methods',
              element: 'methods',
            }]
          },
          {
            name: 'Examples',
            route: 'examples',
            children: [{
              name: 'Elements only',
              route: 'elements'
            },
              {
                name: 'Routes only',
                route: 'routes'
              },
              {
                name: 'Combined',
                route: 'combined'
              },
              {
                name: 'This website',
                route: 'this'
              }
            ]
          },
          {
            name: 'Styling',
            route: 'styling'
          },
          {
            name: 'Visit GitHub',
            external: 'https://github.com/MisRob/vue-tree-navigation'
          }
        ],

      };
    },
  };
</script>