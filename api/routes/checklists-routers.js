const express = require('express');

const router = new express.Router();
const checklistControler = require('../controllers/checklist-controler');
const saveChecklistProgressController = require('../controllers/save-checklist-progress-controller');
const viewedChecklistController = require('../controllers/viewed-checkist-controller');
const slugController = require('../controllers/slug-controller');
const authCheck = require('../middlewares/auth-check');
const nestedChecklistController = require('../controllers/nested-checklist-controller');

router.get('/', checklistControler.getAll);
router.get('/page=:activePage/search=:searchValue/limit=:itemsInPage', checklistControler.getFive);
router.get('/search=:searchValue', checklistControler.searchFilter);
router.get('/author=:id', checklistControler.searchByAuthor);
router.get('/:id', checklistControler.getOne);
router.post('/create', authCheck, checklistControler.createCheckList);
router.post('/set-checkbox-data', authCheck, saveChecklistProgressController.setCheckboxesData);
router.post('/create-users-checklists', authCheck, saveChecklistProgressController.createUserChecklistCollection);
router.get('/get-nested-checklist=:id', nestedChecklistController.getNestedChecklist);
router.post('/create-nested-checklist', nestedChecklistController.createNestedChecklist);
router.get('/get-viewed-checklists/userid=:id/page=:page/perpage=:perpage', viewedChecklistController.getViewedChecklists);
router.delete('/delete-history/userid=:id', authCheck, viewedChecklistController.deleteHistoryOfViewedLists);
router.post('/create/:id/:sectionId', authCheck, checklistControler.createCheckListItem);
router.patch('/new-slug', authCheck, slugController.findAndUpdateSlug);
router.put('/:id', authCheck, checklistControler.update);
router.delete('/:id', authCheck, checklistControler.deleteList);

module.exports = router;
