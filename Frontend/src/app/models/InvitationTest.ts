export interface InvitationTest {
    id: number;
    statut: string;
    dateInvitation: string;
    test: {
      id: number;  // ID du test ajouté
      titre: string;
      description: string;
      type: string;
      duree: number | null;
    };
  }
  