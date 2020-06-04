<template>
  <div>
    <h1>listes des utilisateurs suspecté d'etre contaminé</h1>
    <hr />
    <b-row>
      <b-col cols="12">
        <br />
        <b-table head-variant="dark" primary-key="id_op" :fields="fields" :items="suspecteds" hover>
          <template v-slot:cell(#)="data">{{ data.index + 1 }}</template>
          <template v-slot:cell(date_op)="data">{{ data.value }}</template>
          <template v-slot:cell(update_timestamp)="data">{{ moment(data.value) }}</template>

          <template v-slot:cell(actions)="row">
            <b-dropdown variant="warning" id="dropdown-buttons" text="Options" class="m-2">
              <b-dropdown-item-button @click="call(row.item)">telephoner</b-dropdown-item-button>
              <b-dropdown-item-button
                @click="confirm(row.item, row.index)"
              >confirmer la contamination</b-dropdown-item-button>
            </b-dropdown>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { firestore } from "@/firestore";

import * as moment from "moment";
//import 'moment/locale/fr';

export default {
  name: "dashboard",
  data() {
    return {
      suspecteds: [],
      fields: [
        "#",
        {
          key: "id",
          label: "identifiant",
          sortable: true
        },

        {
          key: "last_status",
          label: "dernier status",
          sortable: true
        },
        {
          key: "update_timestamp",
          label: "date de maj",
          sortable: true
        },
        "actions"
      ]
    };
  },
  methods: {
    call: function(item) {
      window.location.href = "tel:" + item.phone;
      this.$bvToast.toast("l'appelle va demarrer", {
        title: `Succée`,
        variant: "success",
        solid: true
      });
    },
    confirm(item, index) {
      firestore
        .collection("users")
        .doc(item.id)
        .update({
          status: "Contamined",
          update_timestamp: firestore.app.firebase_.firestore.FieldValue.serverTimestamp()
        })
        .then(() => {
          console.log("success");
          this.suspecteds.splice(index, 1);
          this.$bvToast.toast("la notif va etre envoyé", {
            title: `le cas a été confirmé`,
            variant: "success",
            solid: true
          });
        })
        .catch(error => {console.log(error),
        this.$bvToast.toast("erreur: "+error , {
            title: `Erreur`,
            variant: "danger",
            solid: true
          });});
      
    },
    moment(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    }
  },
  mounted() {
    // map `this.u  ` to `this.$store.getters.user`
    moment.locale("fr");

    firestore
      .collection("users")
      .where("status", "==", "?Contamined")
      .get()
      .then(querySnapshot => {
        this.suspecteds = [];
        querySnapshot.forEach(doc => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          var suspected = doc.data();
          suspected.id = doc.id;
          suspected.update_timestamp = suspected.update_timestamp.toDate();
          this.suspecteds.push(suspected);
        });
      })
      .catch(function(error) {
        console.log("Error getting documents: ", error);
      });
  },
  filters: {}
};
</script>