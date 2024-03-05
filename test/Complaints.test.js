const Complaints = artifacts.require("Complaints");

contract("Complaints", accounts => {
    let complaintsInstance;

    beforeEach(async () => {
        complaintsInstance = await Complaints.new();
    });

    it("Debería permitir a un usuario añadir una queja", async () => {
        const complaintText = "Esta es una queja de prueba";
        
        await complaintsInstance.addComplaint(complaintText, { from: accounts[0] });

        const userComplaints = await complaintsInstance.getMyComplaints({ from: accounts[0] });

        assert.equal(userComplaints.length, 1, "No se añadió la queja correctamente");
        assert.equal(userComplaints[0].text, complaintText, "El texto de la queja no coincide");
    });

    it("Debería devolver el listado de quejas de un usuario", async () => {
        const complaintText1 = "Queja 1";
        const complaintText2 = "Queja 2";

        await complaintsInstance.addComplaint(complaintText1, { from: accounts[0] });
        await complaintsInstance.addComplaint(complaintText2, { from: accounts[0] });

        const userComplaints = await complaintsInstance.getMyComplaints({ from: accounts[0] });

        assert.equal(userComplaints.length, 2, "El número de quejas del usuario es incorrecto");
        assert.equal(userComplaints[0].text, complaintText1, "El texto de la primera queja no coincide");
        assert.equal(userComplaints[1].text, complaintText2, "El texto de la segunda queja no coincide");
    });

    it("Debería devolver el listado de todas las quejas", async () => {
        const complaintText1 = "Queja 1";
        const complaintText2 = "Queja 2";

        await complaintsInstance.addComplaint(complaintText1, { from: accounts[0] });
        await complaintsInstance.addComplaint(complaintText2, { from: accounts[1] });

        const allComplaints = await complaintsInstance.getAllComplaints({ from: accounts[0] });

        assert.equal(allComplaints.length, 2, "El número de todas las quejas es incorrecto");
        assert.equal(allComplaints[0].text, complaintText1, "El texto de la primera queja no coincide");
        assert.equal(allComplaints[1].text, complaintText2, "El texto de la segunda queja no coincide");
    });


});
