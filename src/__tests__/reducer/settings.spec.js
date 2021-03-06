import reducer from "../../reducer/settings";
import actions from "../../action";
import ROOT_STATE from "../../reducer/defaultState";

const DEFAULT_STATE = ROOT_STATE.settings,
      FIX_DIR1 = "DIR1",
      FIX_NAME1 = "NAME1",
      FIX_DIR2 = "DIR2",
      FIX_NAME2 = "NAME2",
      FIX_DIR3 = "DIR3",
      FIX_NAME3 = "NAME3";

function addSettingsProject( state, dir, name ) {
  return reducer( state, {
    type: actions.addSettingsProject,
    payload: { dir, name }
  });
}

function removeSettingsProject( state, dir ) {
  return reducer( state, {
    type: actions.removeSettingsProject,
    payload: dir
  });
}


describe( "Reducer: settings", () => {

  it( "updates with setSettings", () => {
    let state =  reducer( DEFAULT_STATE, {
      type: actions.setSettings,
      payload: { projectDirectory: FIX_DIR1 }
    });
    expect( state.projectDirectory ).toBe( FIX_DIR1 );
    expect( DEFAULT_STATE.projectDirectory ).toBe( "" );
  });

  it( "adds a new project", () => {
    let state = addSettingsProject( DEFAULT_STATE, FIX_DIR1, FIX_NAME1 );
    const projects = state.projects;
    expect( projects[ FIX_DIR1 ]).toBe( FIX_NAME1 );
    expect( Object.keys( DEFAULT_STATE.projects ).length ).toBe( 0 );
  });

  it( "adds multiple projects and they get sorted", () => {
    let state = addSettingsProject( DEFAULT_STATE, FIX_DIR1, FIX_NAME1 );
    state = addSettingsProject( state, FIX_DIR3, FIX_NAME3 );
    state = addSettingsProject( state, FIX_DIR2, FIX_NAME2 );
    const projects = Object.entries( state.projects );
    expect( projects.length ).toBe( 3 );
    expect( projects[ 0 ][ 0 ]).toBe( FIX_DIR1 );
    expect( projects[ 0 ][ 1 ]).toBe( FIX_NAME1 );
    expect( projects[ 1 ][ 0 ]).toBe( FIX_DIR2 );
    expect( projects[ 1 ][ 1 ]).toBe( FIX_NAME2 );
    expect( projects[ 2 ][ 0 ]).toBe( FIX_DIR3 );
    expect( projects[ 2 ][ 1 ]).toBe( FIX_NAME3 );
  });

  it( "removes projects", () => {
    let state = addSettingsProject( DEFAULT_STATE, FIX_DIR1, FIX_NAME1 );
    state = addSettingsProject( state, FIX_DIR3, FIX_NAME3 );
    state = addSettingsProject( state, FIX_DIR2, FIX_NAME2 );
    state = removeSettingsProject( state, FIX_DIR1 );
    const projects = Object.entries( state.projects );
    expect( projects.length ).toBe( 2 );
    expect( projects[ 0 ][ 0 ]).toBe( FIX_DIR2 );
    expect( projects[ 0 ][ 1 ]).toBe( FIX_NAME2 );
    expect( projects[ 1 ][ 0 ]).toBe( FIX_DIR3 );
    expect( projects[ 1 ][ 1 ]).toBe( FIX_NAME3 );
  });

  it( "overrides project with the same dir", () => {
    let state = addSettingsProject( DEFAULT_STATE, FIX_DIR1, FIX_NAME1 );
    state = addSettingsProject( state, FIX_DIR3, FIX_NAME3 );
    state = addSettingsProject( state, FIX_DIR3, FIX_NAME2 );
    const projects = Object.entries( state.projects );
    expect( projects.length ).toBe( 2 );
    expect( projects[ 1 ][ 1 ]).toBe( FIX_NAME2 );
  });

  it( "may have mutltiple projects with same names", () => {
    let state = addSettingsProject( DEFAULT_STATE, FIX_DIR1, FIX_NAME1 );
    state = addSettingsProject( state, FIX_DIR3, FIX_NAME1 );
    state = addSettingsProject( state, FIX_DIR2, FIX_NAME1 );
    const projects = Object.entries( state.projects );
    expect( projects.length ).toBe( 3 );
    expect( projects[ 0 ][ 1 ]).toBe( FIX_NAME1 );
  });

});
