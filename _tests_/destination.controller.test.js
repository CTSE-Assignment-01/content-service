const Destination = require('../models/destination.model');
const DestinationController = require('../controllers/destination.controller');

// Mocks
jest.mock('../models/destination.model');

const mockRes = () => {
  const res = {};
  res.status = jest.fn(() => res);
  res.json = jest.fn(() => res);
  return res;
};

describe('DestinationController', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('createDestination - success', async () => {
    const req = { body: { name: 'Beach', country: 'Sri Lanka' } };
    const res = mockRes();

    Destination.mockImplementation(() => ({
      save: jest.fn().mockResolvedValue(req.body),
    }));

    await DestinationController.createDestination(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(req.body);
  });

  test('getAllDestinations - success', async () => {
    const req = {};
    const res = mockRes();
    const data = [{ name: 'Beach' }];

    Destination.find.mockResolvedValue(data);

    await DestinationController.getAllDestinations(req, res);

    expect(Destination.find).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(data);
  });

  test('getDestinationById - found', async () => {
    const req = { params: { id: '123' } };
    const res = mockRes();
    const mockDestination = { _id: '123', name: 'Temple' };

    Destination.findById.mockResolvedValue(mockDestination);

    await DestinationController.getDestinationById(req, res);

    expect(Destination.findById).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockDestination);
  });

  test('getDestinationById - not found', async () => {
    const req = { params: { id: '123' } };
    const res = mockRes();

    Destination.findById.mockResolvedValue(null);

    await DestinationController.getDestinationById(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: 'Destination not found' });
  });

  test('updateDestination - success', async () => {
    const req = { params: { id: '123' }, body: { name: 'Updated' } };
    const res = mockRes();
    const updatedData = { _id: '123', name: 'Updated' };

    Destination.findByIdAndUpdate.mockResolvedValue(updatedData);

    await DestinationController.updateDestination(req, res);

    expect(Destination.findByIdAndUpdate).toHaveBeenCalledWith('123', { name: 'Updated' }, { new: true });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedData);
  });

  test('deleteDestination - success', async () => {
    const req = { params: { id: '123' } };
    const res = mockRes();

    Destination.findByIdAndDelete.mockResolvedValue({});

    await DestinationController.deleteDestination(req, res);

    expect(Destination.findByIdAndDelete).toHaveBeenCalledWith('123');
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Destination deleted successfully' });
  });
});
