import Manifold from '../../data/abi/Manifold.json';
import addresses from '../../../data/addresses.json';

const state = {
  num: 0,
  manifoldAbi: null,
  manifoldAddress: null,
  manifoldContract: null,
};

const getters = {
  getNum(state) {
    return state.num;
  },
  getManifoldAbi(state) {
    return state.manifoldAbi;
  },
  getManifoldAddress(state) {
    return state.manifoldAddress;
  },
  getManifoldContract(state) {
    return state.manifoldContract;
  },
};

const actions = {
  async fetchManifoldContract({ commit, rootState }) {
    let web3 = rootState.accounts.web3;
    let chainIdDec = parseInt(rootState.accounts.chainId);
    let manifoldAddress = addresses.Manifold[chainIdDec];

    let contract = new web3.eth.Contract(Manifold.abi, manifoldAddress);
    commit('setManifoldContract', contract);
  },
  async fetchNum({ commit, state }) {
    if (!state.manifoldContract) {
      this.fetchManifoldContract();
    }

    let num = await state.manifoldContract.methods.getNum().call();

    commit('setNum', num);
  },
  storeManifoldAbi({ commit }) {
    commit('setManifoldAbi', Manifold.abi);
  },
  storeManifoldAddress({ commit, rootState }) {
    let chainIdDec = parseInt(rootState.accounts.chainId);
    let manifoldAddress = addresses.Manifold[chainIdDec];

    commit('setManifoldAddress', manifoldAddress);
  },
};

const mutations = {
  setNum(state, _num) {
    state.num = _num;
  },
  setManifoldAbi(state, abi) {
    state.manifoldAbi = abi;
  },
  setManifoldAddress(state, address) {
    state.manifoldAddress = address;
  },
  setManifoldContract(state, _contract) {
    state.manifoldContract = _contract;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
