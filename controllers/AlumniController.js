// import Model Alumni
const Alumni = require("../models/Alumni")
// buat class AlumniController
class AlumniController {
  // buat fungsi
  async index(req, res) {
    const alumni = await Alumni.all();
  
    if (!alumni || alumni.length === 0) {
      return res.status(404).json({
        message: "Data is empty",
        data: [],
      });
    }
    const data = {
      message: "Get All Resource",
      data: alumni,
    };
    res.json(data);
  }

  async store(req, res) {
    const { name, phone, address, graduation_year, status, company_name, position } = req.body;
    try {
      if (!name || !phone || !address || !graduation_year || !status || !company_name || !position) {
        throw new Error("all files must not be empty");
      } 
      const newAlumni = await Alumni.create({
        name,
        phone,
        address,
        graduation_year,
        status,
        company_name,
        position,
      });

      const data = {
        message: "Resource is added successfully",
        data: newAlumni,
      };
      res.json(data);
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    }
  }
  async update(req, res) {
    const { id } = req.params;
    const alumni = await Alumni.find(id);
    if (alumni) {
      const alumni = await Alumni.update(id, req.body);
      const data = {
        message: "Resource is update successfully",
        data: alumni,
      };
      res.status(200).json(data);
    } else {
      const data = {
        message: "Resource Not Found",
      };
      res.status(404).json(data);
    }
  }

  async destroy(req, res) {
    const { id } = req.params;
    const alumni = await Alumni.find(id);
      if (alumni) {
      await Alumni.delete(id);
      const data = { message: `Resource is delete successfully ` };
      res.status(200).json(data);
    } else {
      const data = { message: `Resource Not Found` };
      res.status(404).json(data);
    }
  }

  async show(req, res) {
    const { id } = req.params;
    const alumni = await Alumni.find(id);
    if (alumni) {
      const data = { message: `Get Detaile Resource`, data: alumni };
      res.status(200).json(data);
    } else {
      const data = { message: `Resource Not Found` };
      res.status(404).json(data);
    }
  }

  async search(req, res) {
    const { name } = req.params;

    const alumni = await Alumni.search(name);

    if (!alumni) {
      return res.status(404).json({
        message: "Resource not found",
        status: 404,
      });
    }

    return res.status(200).json({
      message: "Get Searched Resource",
      data: alumni,
      status: 200,
    });
  }

  async freshGraduate(req, res) {
    const status = "fresh-graduate";

    const alumni = await Alumni.filterByStatus(status);

    if (!alumni) {n
      return res.status(404).json({
        message: "Resource not found",
        status: 404,
      });
    }

    const totalAlumni = await Alumni.getStatusCount(status);

    return res.status(200).json({
      message: "Get Fresh Graduate Resource",
      data: alumni,
      status: 200,
      total: totalAlumni
    });
  }

  async employed(req, res) {
    const status = "employed";

    const alumni = await Alumni.filterByStatus(status);

    if (!alumni) {
      return res.status(404).json({
        message: "Resource not found",
        status: 404,
      });
    }

    const totalAlumni = await Alumni.getStatusCount(status);

    return res.status(200).json({
      message: "Get Employed Resource",
      data: alumni,
      status: 200,
      total: totalAlumni
    });
  }

  async unemployed(req, res) {
    const status = "unemployed";

    const alumni = await Alumni.filterByStatus(status);

    if (!alumni) {
      return res.status(404).json({
        message: "Resource not found",
        status: 404,
      });
    }

    const totalAlumni = await Alumni.getStatusCount(status);

    return res.status(200).json({
      message: "Get Unemployed Resource",
      data: alumni,
      status: 200,
      total: totalAlumni
    });
  }
}

// membuat object AlumniController
const object = new AlumniController();

// export object AlumniController
module.exports = object;
