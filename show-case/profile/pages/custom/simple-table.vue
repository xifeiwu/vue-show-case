<template>
  <article id="app" class="page">
    <h1 class="page-title">
      <a href="https://github.com/spatie/vue-table-component">Vue-table-component</a>
    </h1>
    <table-component
            :data="[
            { firstName: 'John', lastName: 'Lennon', instrument: 'Guitar', birthday: '04/10/1940', songs: 72 },
            { firstName: 'Paul', lastName: 'McCartney', instrument: 'Bass', birthday: '18/06/1942', songs: 70 },
            { firstName: 'George', lastName: 'Harrison', instrument: 'Guitar', birthday: '25/02/1943', songs: 22 },
            { firstName: 'Ringo', lastName: 'Starr', instrument: 'Drums', birthday: '07/07/1940', songs: 2 },
            { firstName: 'John', lastName: 'Lennon', instrument: 'Guitar', birthday: '04/10/1940', songs: 72 },
            { firstName: 'Paul', lastName: 'McCartney', instrument: 'Bass', birthday: '18/06/1942', songs: 70 },
            { firstName: 'George', lastName: 'Harrison', instrument: 'Guitar', birthday: '25/02/1943', songs: 22 },
            { firstName: 'Ringo', lastName: 'Starr', instrument: 'Drums', birthday: '07/07/1940', songs: 2 },
            ]"
            sort-by="songs"
            sort-order="asc"
    >
      <table-column show="firstName" label="First name"></table-column>
      <table-column show="lastName" label="Last name"></table-column>
      <table-column show="instrument" label="Instrument"></table-column>
      <table-column show="songs" label="Songs" data-type="numeric"></table-column>
      <table-column show="birthday" label="Birthday" data-type="date:DD/MM/YYYY"></table-column>
      <table-column :sortable="false" :filterable="false">
        <template slot-scope="artist">
          <a :href="'#' + artist.firstName.toLowerCase()">
            Edit
        </a>
        </template>
      </table-column>
      <template slot="tfoot" slot-scope="{ rows }">
        <tr>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
          <th>Total Songs:</th>
          <th>{{ rows.reduce((sum, value) => { return sum + value.data.songs; }, 0) }}</th>
          <th>&nbsp;</th>
          <th>&nbsp;</th>
        </tr>
      </template>
    </table-component>

    <section class="page-about">
      <h2 class="page-subtitle">About</h2>
      <p>
        The table component above is powered by <a href="https://github.com/spatie/vue-table-component">spatie/vue-table-component</a>.
            <br>
        The component allows for straightforward and lightweight <strong>sorting</strong> and <strong>filtering</strong> of table data.</p>

      <p>The component will also remember the state when you reload or return to the same page within 15 min.
            </p>
    </section>

    <small class="page-outro">
      <a href="https://github.com/spatie/vue-table-component">Code on GitHub</a> |
            Proudly presented by <a href="https://spatie.be">spatie.be</a>
    </small>
  </article>
</template>

<script>
  import { TableColumn, TableComponent } from '$components/custom/simple-table';
  export default {
    components: {
      TableColumn,
      TableComponent,
    },
  }
</script>